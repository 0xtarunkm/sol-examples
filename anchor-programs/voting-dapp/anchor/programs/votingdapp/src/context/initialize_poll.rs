use crate::state::Poll;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializePoll<'info> {
    #[account(mut)]
    signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        seeds = [b"poll".as_ref()],
        bump,
        space = 8 + Poll::INIT_SPACE,
    )]
    poll: Account<'info, Poll>,
    system_program: Program<'info, System>,
}

impl<'info> InitializePoll<'info> {
    pub fn init(&mut self) -> Result<()> {
        self.poll.set_inner(Poll {
            poll_id: (),
            description: (),
            poll_start: (),
            poll_end: (),
            candidate_amount: (),
        });

        Ok(())
    }
}
