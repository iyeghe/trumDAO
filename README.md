# TrumDAO Smart Contract

This repository contains the Clarity source code for **TrumDAO**, an advanced, feature-rich staking DAO contract for the Stacks blockchain. TrumDAO enables decentralized governance, treasury management, reward distribution, quadratic and time-weighted voting, automated proposal execution, and robust security controls.

---

## Table of Contents

- Features
- Contract Architecture
- Staking System
- Governance & Proposals
- Voting Mechanisms
- Treasury Management
- Reward Distribution
- Delegation
- Emergency Controls
- Read-Only Functions
- Security & Validation
- Usage Guide
- Repository Structure
- License
- Contact

---

## Features

- **Advanced Voting:** Time-weighted, quadratic, and tier-based voting mechanisms.
- **Flexible Staking:** Basic and locked staking with time-weighted benefits.
- **Sophisticated Proposals:** Multiple proposal types with customizable rules.
- **Treasury Management:** Secure, multi-signature style treasury proposals and execution.
- **Reward Distribution:** Automated, batch, and individual reward processing.
- **Delegation:** Safe, flexible voting power delegation.
- **Emergency Controls:** Owner can enable emergency unstaking.
- **Comprehensive Security:** Input validation, admin controls, and blacklist system.
- **Automated Execution:** Proposals can be queued and executed after a delay.

---

## Contract Architecture

### Constants & Setup

- **Ownership:** `contract-owner` is set at deployment.
- **Error Codes:** Comprehensive error handling for all failure cases.
- **Staking & Voting Parameters:** Configurable minimums, maximums, and durations.

### Data Variables & Maps

- **Admins & Blacklist:** Manage privileged users and block malicious actors.
- **Staking:** Track user stakes, weights, and history.
- **Proposals:** Store proposal types, proposals, votes, and execution queue.
- **Treasury:** Manage treasury proposals and balance.
- **Rewards:** Track reward pools and user rewards.
- **Delegation:** Allow users to delegate voting power.

---

## Staking System

- **Basic Staking:**  
  Stake tokens with a minimal lock period using `stake-basic(amount)`.
- **Locked Staking:**  
  Stake tokens for a custom lock duration for higher voting weight using `stake-with-lock(amount, lock-duration)`.
- **Time-Weighted Benefits:**  
  Voting power increases with the duration of staking.
- **Emergency Unstaking:**  
  If emergency mode is enabled, users can unstake immediately.

---

## Governance & Proposals

- **Proposal Types:**  
  - `standard`: Basic governance
  - `treasury`: Fund allocations (quadratic & time-weighted voting)
  - `parameter`: Contract parameter changes (quadratic & time-weighted voting)
  - `emergency`: Fast-track critical changes
  - `long-term`: Extended voting periods with time-weighting

- **Proposal Creation:**  
  Admins can create proposals with custom types, execution data, and whether they are executable.

- **Automated Execution:**  
  Executable proposals can be queued and executed after a delay.

---

## Voting Mechanisms

- **Standard Voting:**  
  Vote power is based on staked amount and participation tier.
- **Time-Weighted Voting:**  
  Vote power increases with how long a user has staked.
- **Quadratic Voting:**  
  Users allocate vote credits for quadratic voting on supported proposals.
- **Delegation:**  
  Users can delegate their voting power to another principal, with circular delegation protection.

---

## Treasury Management

- **Fund Treasury:**  
  Admins can add funds to the DAO treasury.
- **Treasury Proposals:**  
  Admins can create proposals to allocate treasury funds.
- **Voting & Execution:**  
  Treasury proposals require voting and can only be executed if approved.

---

## Reward Distribution

- **Staking Rewards:**  
  Automatically calculated based on stake amount and duration.
- **Governance Rewards:**  
  Distributed in batch or individually to users.
- **Reward Pools:**  
  Multiple pools can be created with different parameters.

---

## Delegation

- **Delegate Voting Power:**  
  Users can delegate their voting power to another principal using `delegate-to(delegate)`.
- **Safety:**  
  Prevents self-delegation and circular delegation.

---

## Emergency Controls

- **Toggle Emergency:**  
  Contract owner can enable or disable emergency mode.
- **Emergency Unstaking:**  
  Allows users to unstake immediately during emergencies.

---

## Read-Only Functions

Query contract state without making changes:

- `get-contract-info`
- `get-proposal(proposal-id)`
- `get-proposal-votes(proposal-id)`
- `get-user-vote(proposal-id, voter)`
- `get-treasury-proposal(proposal-id)`
- `get-user-stake(user)`
- `get-user-rewards(user)`
- `get-treasury-balance`
- `get-vote-credits(user)`
- `get-user-stats(user)`
- `get-participation-tier(user)`
- `get-proposal-type(type-name)`
- `get-emergency-state`
- `get-stake-history(user)`
- `get-time-weight(user)`
- `get-time-weighted-vote(proposal-id, voter)`
- `calculate-user-time-weighted-power(user)`

---

## Security & Validation

- **Access Control:**  
  Only admins or the contract owner can perform sensitive actions.
- **Input Validation:**  
  All parameters are validated for type, range, and length.
- **Blacklist:**  
  Block suspicious or malicious addresses.
- **Error Handling:**  
  Specific error codes and consistent responses for all failure cases.
- **Delegation Safety:**  
  Prevents circular delegation and self-delegation.

---

## Usage Guide

### 1. Initial Setup
- Deploy the contract to the Stacks blockchain.
- Add initial admins using `add-admin(new-admin)`.

### 2. Admin Operations
- Create new proposal types.
- Fund the treasury and manage reward pools.
- Toggle emergency state if needed.

### 3. User Participation
- Stake tokens (basic or locked).
- Vote on proposals (standard, time-weighted, or quadratic).
- Claim staking and governance rewards.
- Delegate voting power to another user.

### 4. Monitoring
- Track stake history and time-weighted voting power.
- View proposal and treasury status.
- Monitor rewards and participation tiers.

---

## Repository Structure

```
├── contracts/
│   └── trumDAO.clar    # Main contract source code
├── tests/              # Test files (if available)
└── README.md           # Documentation
```

---

## License

This contract is provided for educational and research purposes. Please review and audit before deploying in production.

---

## Contact

For questions or contributions, please open an issue or pull request in this repository.
