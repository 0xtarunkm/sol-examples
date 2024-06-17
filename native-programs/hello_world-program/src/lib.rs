// ProgramID: 2HK4VW5dYoi6ZjFp34dz2Ur3MZAfMm1yc6mPBCMTriDy
use solana_program::{
    account_info::AccountInfo,
    pubkey::Pubkey,
    msg,
    entrypoint,
    entrypoint::ProgramResult
};

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    msg!("Hello from the Solana program");
    Ok(())
}