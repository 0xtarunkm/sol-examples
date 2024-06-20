use anchor_lang::prelude::*;

declare_id!("4BnwJ3bBtRWU5yunMkW76qnVjwYFRrb2FRQT4zPKxcaj");

#[program]
pub mod counter_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        counter.bump = ctx.bumps.counter;
        msg!("Counter in initialized");
        msg!("Current value of counter is {}", counter.count);
        msg!("Counter bump {}", counter.bump);
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        msg!("Previous count: {}", counter.count);
        counter.count = counter.count.checked_add(1).unwrap();
        msg!("Counter incremented");
        msg!("Current value of counter is {}", counter.count);
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        msg!("Previous value of the counter: {}", counter.count);
        counter.count = counter.count.checked_sub(1).unwrap();
        msg!("Counter decremented");
        msg!("Current value of counter is {}", counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + Counter::INIT_SPACE, seeds = [b"counter"], bump)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut, seeds = [b"counter"], bump = counter.bump)]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: u64,
    pub bump: u8,
}
