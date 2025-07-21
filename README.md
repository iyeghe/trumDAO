# TrumDAO Smart Contract

This repository contains the Clarity source code for **TrumDAO**, an advanced staking DAO contract for the Stacks blockchain. TrumDAO provides decentralized governance, treasury management, reward distribution, quadratic voting, and automated proposal execution.

---

## Features

- **Staking System:** Stake the DAO's fungible token (`trum-dao-token`) with optional lock periods for increased weight.
- **Governance:** Create and vote on proposals with support for multiple proposal types and quadratic voting.
- **Treasury Management:** Fund the DAO treasury, create treasury proposals, and execute approved transfers.
- **Reward Distribution:** Distribute staking and governance rewards to participants.
- **Automated Execution:** Queue and execute proposals after a configurable delay.
- **Delegation:** Delegate voting power to another principal.
- **Emergency State:** Owner can toggle emergency mode for instant unstaking.

---

## Contract Structure

### Constants

Defines error codes, staking limits, string length limits, voting periods, and execution delays.

### Data Variables & Maps

- **Admins & Blacklist:** Manage privileged users and blacklisted addresses.
- **Staking:** Track stakes, weights, user stats, participation tiers, and delegations.
- **Proposals:** Store proposal types, proposals, votes, quadratic votes, and vote totals.
- **Treasury:** Manage treasury proposals and balance.
- **Rewards:** Track reward pools and user rewards.
- **Execution Queue:** Manage automated proposal execution.

### Core Functions

#### Staking

- `stake-basic(amount)`
- `stake-with-lock(amount, lock-duration)`
- `unstake()`

#### Governance

- `create-proposal(title, description, proposal-type, executable, execution-data)`
- `vote(proposal-id, support)`
- `quadratic-vote(proposal-id, vote-count)`
- `delegate-to(delegate)`

#### Treasury

- `fund-treasury(amount)`
- `create-treasury-proposal(recipient, amount, purpose)`
- `vote-treasury-proposal(proposal-id, support)`
- `execute-treasury-proposal(proposal-id)`

#### Rewards

- `create-reward-pool(total-rewards, duration, pool-type)`
- `claim-staking-rewards()`
- `distribute-governance-rewards(users, amounts)`
- `distribute-single-governance-reward(user, amount)`

#### Automated Execution

- `queue-for-execution(proposal-id, execution-delay, execution-type)`
- `execute-queued-proposal(proposal-id)`

#### Admin

- `add-admin(new-admin)`
- `toggle-emergency()`
- `add-proposal-type(type-name, minimum-stake, voting-period, execution-delay, quadratic)`

#### Read-Only

- Query proposals, votes, user stats, treasury balance, rewards, and contract info.

---

## Usage

1. **Deploy the contract** to the Stacks blockchain.
2. **Initialize proposal types** (done automatically on deployment).
3. **Admins** can fund the treasury, create proposals, and manage rewards.
4. **Users** stake tokens to participate, vote on proposals, and claim rewards.
5. **Emergency state** can be toggled by the contract owner for instant unstaking.

---

## Security

- **Access Control:** Only admins or contract owner can perform sensitive actions.
- **Validation:** All inputs are validated for length, amount, and type.
- **Error Handling:** Custom error codes for all failure cases.

---

## Read-Only Queries

- `get-contract-info`
- `get-proposal`
- `get-proposal-votes`
- `get-user-vote`
- `get-treasury-proposal`
- `get-user-stake`
- `get-user-rewards`
- `get-treasury-balance`
- `get-vote-credits`
- `get-user-stats`
- `get-participation-tier`
- `get-proposal-type`
- `get-emergency-state`

---

## License

This contract is provided for educational and research purposes. Please review and audit before deploying in production.

---

## File

- trumDAO.clar — Main contract source code

---

## Contact

For questions or contributions, please open an issue or pull request on this repository.# TrumDAO Smart Contract

This repository contains the Clarity source code for **TrumDAO**, an advanced staking DAO contract for the Stacks blockchain. TrumDAO provides decentralized governance, treasury management, reward distribution, quadratic voting, and automated proposal execution.

---

## Features

- **Staking System:** Stake the DAO's fungible token (`trum-dao-token`) with optional lock periods for increased weight.
- **Governance:** Create and vote on proposals with support for multiple proposal types and quadratic voting.
- **Treasury Management:** Fund the DAO treasury, create treasury proposals, and execute approved transfers.
- **Reward Distribution:** Distribute staking and governance rewards to participants.
- **Automated Execution:** Queue and execute proposals after a configurable delay.
- **Delegation:** Delegate voting power to another principal.
- **Emergency State:** Owner can toggle emergency mode for instant unstaking.

---

## Contract Structure

### Constants

Defines error codes, staking limits, string length limits, voting periods, and execution delays.

### Data Variables & Maps

- **Admins & Blacklist:** Manage privileged users and blacklisted addresses.
- **Staking:** Track stakes, weights, user stats, participation tiers, and delegations.
- **Proposals:** Store proposal types, proposals, votes, quadratic votes, and vote totals.
- **Treasury:** Manage treasury proposals and balance.
- **Rewards:** Track reward pools and user rewards.
- **Execution Queue:** Manage automated proposal execution.

### Core Functions

#### Staking

- `stake-basic(amount)`
- `stake-with-lock(amount, lock-duration)`
- `unstake()`

#### Governance

- `create-proposal(title, description, proposal-type, executable, execution-data)`
- `vote(proposal-id, support)`
- `quadratic-vote(proposal-id, vote-count)`
- `delegate-to(delegate)`

#### Treasury

- `fund-treasury(amount)`
- `create-treasury-proposal(recipient, amount, purpose)`
- `vote-treasury-proposal(proposal-id, support)`
- `execute-treasury-proposal(proposal-id)`

#### Rewards

- `create-reward-pool(total-rewards, duration, pool-type)`
- `claim-staking-rewards()`
- `distribute-governance-rewards(users, amounts)`
- `distribute-single-governance-reward(user, amount)`

#### Automated Execution

- `queue-for-execution(proposal-id, execution-delay, execution-type)`
- `execute-queued-proposal(proposal-id)`

#### Admin

- `add-admin(new-admin)`
- `toggle-emergency()`
- `add-proposal-type(type-name, minimum-stake, voting-period, execution-delay, quadratic)`

#### Read-Only

- Query proposals, votes, user stats, treasury balance, rewards, and contract info.

---

## Usage

1. **Deploy the contract** to the Stacks blockchain.
2. **Initialize proposal types** (done automatically on deployment).
3. **Admins** can fund the treasury, create proposals, and manage rewards.
4. **Users** stake tokens to participate, vote on proposals, and claim rewards.
5. **Emergency state** can be toggled by the contract owner for instant unstaking.

---

## Security

- **Access Control:** Only admins or contract owner can perform sensitive actions.
- **Validation:** All inputs are validated for length, amount, and type.
- **Error Handling:** Custom error codes for all failure cases.

---

## Read-Only Queries

- `get-contract-info`
- `get-proposal`
- `get-proposal-votes`
- `get-user-vote`
- `get-treasury-proposal`
- `get-user-stake`
- `get-user-rewards`
- `get-treasury-balance`
- `get-vote-credits`
- `get-user-stats`
- `get-participation-tier`
- `get-proposal-type`
- `get-emergency-state`

---

## License

This contract is provided for educational and research purposes. Please review and audit before deploying in production.

---

## File

- trumDAO.clar — Main contract source code

---

## Contact

For questions or contributions, please open an issue or pull request on this repository.
