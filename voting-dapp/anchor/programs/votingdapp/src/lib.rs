#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

mod context;
mod state;

use context::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod votingdapp {

    use super::*;

    pub fn initialize_poll(_ctx: Context<InitializePoll>, _poll_id: u64) -> Result<()> {
        Ok(())
    }
}
