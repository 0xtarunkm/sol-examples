use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    system_instruction,
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{rent::Rent, Sysvar},
};
use solana_program::instruction::Instruction;
use solana_program::instruction::AccountMeta;
use solana_program::program::invoke_signed;

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub enum InstructionData {
    UpdateAddress {
        address: [u8; 512]
    },
    UpdateUserInfo {
        name: [u8; 512],
        date: i32,
        month: i32,
        year: i32,
    },
    Initialize {

    }
}

#[derive(Debug, Clone, BorshSerialize, BorshDeserialize, PartialEq)]
pub struct AddressInstructionData {
    address: [u8; 512]
}

#[derive(Debug, Clone, BorshDeserialize, BorshSerialize, PartialEq)]
pub struct UserProfileInstructionData {
    name: [u8; 512],
    date: i32,
    month: i32,
    year: i32,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct AddressSchema {
    address: [u8; 512]
}

pub fn getAddressSeeds(account: &AccountInfo, program_id: &Pubkey) -> (Pubkey,u8) {
    return Pubkey::find_program_address(&[b"address", &account.key.to_bytes()[..32]], program_id);
}

pub fn getUserProfileSeeds(account: &AccountInfo, program_id: &Pubkey) -> (Pubkey, u8) {
    return Pubkey::find_program_address(&[b"profile", &account.key.to_bytes()[..32]], program_id);
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    msg!("Hello world Rust program entrypoint");

    let instruction = InstructionData::try_from_slice(instruction_data).map_err(|_| ProgramError::InvalidInstructionData)?;
    
    let account_iter = &mut accounts.iter();

    match instruction {
        InstructionData::Initialize {  } => {
            msg!("Initialized PDA's");
            let account = next_account_info(account_iter)?;
            let update_user_info_account = next_account_info(account_iter)?;
            let update_address_account = next_account_info(account_iter)?;
            let update_user_profile_contract = next_account_info(account_iter)?;
            let update_address_contract = next_account_info(account_iter)?;
            let system_program = next_account_info(account_iter)?;

            let (found_address_account, address_bump) = getAddressSeeds(account, program_id);
            if(found_address_account != *update_address_account.key) {
                msg!("Incorrect user info PDA as input");
                msg!(&update_user_info_account.key.to_string());
                return Err(ProgramError::InvalidInstructionData)
            }

            invoke_signed(instruction, account_infos, signers_seeds)
        }
    }
    Ok(())
}