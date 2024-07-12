// 7vGAcbYjnhgqqybRHCrnpwEvwehKZzUHBqS1AmeWc7UF

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    pubkey::Pubkey,
    entrypoint,
    entrypoint::ProgramResult,
    program_error::ProgramError,
    msg
};

#[derive(Debug, BorshDeserialize, BorshSerialize)]
pub struct CounterAccount {
    pub counter: u32,
}

#[derive(Debug, Clone, BorshDeserialize, BorshSerialize, PartialEq)]
pub enum CalculatorInstruction {
    Add {
        data: u32,
    },
    Subtract {
        data: u32,
    }
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    msg!("Entrypoint of the calculator program");

    let instruction  = CalculatorInstruction::try_from_slice(instruction_data).map_err(|_| ProgramError::InvalidInstructionData)?;
    
    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Counter account does not have the correct program ID");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut counter_account = CounterAccount::try_from_slice(&account.data.borrow())?;

    match instruction {
        CalculatorInstruction::Add { data } => {
            msg!("Adding data");
            counter_account.counter += data;
        },
        CalculatorInstruction::Subtract { data } => {
            msg!("Substraction data");
            counter_account.counter -= data;
        }
    }

    counter_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    Ok(())
}