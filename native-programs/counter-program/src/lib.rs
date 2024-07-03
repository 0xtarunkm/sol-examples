// GuudedksDVSptVYJpcbrbvb64rapPtqwASxH4cP9WFdN

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    pubkey::Pubkey,
    entrypoint,
    entrypoint::ProgramResult,
    program_error::ProgramError,
    msg,
};

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct CounterAccount {
    pub counter: u32,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    msg!("Entry point of Counter Program");

    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id { 
        msg!("Counter account does not have the correct program Id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut counter_account = CounterAccount::try_from_slice(&account.data.borrow())?;
    counter_account.counter += 1;
    counter_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Counter incremented {} times", counter_account.counter);

    Ok(())
}

