use starknet::ContractAddress;

// #[derive(Drop, Serde, starknet::Store)]
// pub struct CreditorBalance {
//     paid_amount: u256,
//     remaining_amount: u256,
//     next_payment_date: u256,
//     next_payment_amount: u256,
// }

// #[derive(Drop, Serde, starknet::Store)]
// pub struct DebtorBalance {
//     invested_amount: u256,
//     received_amount: u256,
//     remaining_amount: u256,
//     profit_made: u256,
//     next_payment_amount: u256,
//     next_payment_date: u256,
// }

#[derive(Drop, starknet::Store)]
pub struct Cycle {
    id: u256,
    start_time: u256,
    end_time: u256,
    min_investment: u256,
    is_active: bool,
}

#[starknet::interface]
pub trait IYourContract<TContractState> {
    fn greeting(self: @TContractState) -> ByteArray;
    fn set_greeting(ref self: TContractState, new_greeting: ByteArray, amount_eth: u256);
    fn withdraw(ref self: TContractState);
    fn premium(self: @TContractState) -> bool;

    // cycle management
    fn start_cycle(
        ref self: TContractState, start_time: u256, end_time: u256, min_investment: u256
    );
    fn stop_cycle(ref self: TContractState, cycle_id: u256);
    // fn get_cycles(self: @TContractState) -> LegacyMap<u256, Cycle>;

    fn deposit_in_cycle(ref self: TContractState, cycle_id: u256, amount: u256);

    fn submit_project(
        ref self: TContractState, cycle_id: u256, project_name: ByteArray, budget: u256
    );

    // to be implemented off chain with AI model
    // fn validate_project(ref self: TContractState, project_id: u256, rentability_score: u256);
    fn refund_amount(ref self: TContractState, debtor: ContractAddress, amount: u256);
// fn get_creditor_balance(
//     self: @TContractState, creditor: ContractAddress, cycle_id: u256
// ) -> CreditorBalance;

// fn get_debtor_balance(
//     self: @TContractState, debtor: ContractAddress, cycle_id: u256
// ) -> DebtorBalance;
// fn get_creditor_history(
//     self: @TContractState, creditor: ContractAddress
// ) -> LegacyMap<u256, u256>;
// fn get_debtor_history(self: @TContractState, debtor: ContractAddress) -> LegacyMap<u256, u256>;
}

#[starknet::contract]
mod YourContract {
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};
    use starknet::{get_caller_address, get_contract_address};
    use super::Cycle;
    use super::{ContractAddress, IYourContract};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    const ETH_CONTRACT_ADDRESS: felt252 =
        0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        GreetingChanged: GreetingChanged,
        CycleStarted: CycleStarted,
        CycleStopped: CycleStopped,
        DepositMade: DepositMade,
        ProjectSubmitted: ProjectSubmitted,
        ProjectValidated: ProjectValidated,
        RefundMade: RefundMade,
    }

    #[derive(Drop, starknet::Event)]
    struct GreetingChanged {
        #[key]
        greeting_setter: ContractAddress,
        #[key]
        new_greeting: ByteArray,
        premium: bool,
        value: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct CycleStarted {
        cycle_id: u256,
        start_time: u256,
        end_time: u256,
        min_investment: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct CycleStopped {
        cycle_id: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct DepositMade {
        #[key]
        creditor: ContractAddress,
        cycle_id: u256,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ProjectSubmitted {
        project_id: u256,
        cycle_id: u256,
        project_name: ByteArray,
        budget: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct ProjectValidated {
        project_id: u256,
        rentability_score: u256,
        is_valid: bool,
    }

    #[derive(Drop, starknet::Event)]
    struct RefundMade {
        debtor: ContractAddress,
        amount: u256,
    }

    #[storage]
    struct Storage {
        eth_token: IERC20CamelDispatcher,
        greeting: ByteArray,
        premium: bool,
        total_counter: u256,
        user_greeting_counter: LegacyMap<ContractAddress, u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        // storage variables for the investment cycle
        cycles: LegacyMap<u256, Cycle>,
        projects: LegacyMap<u256, Project>,
        deposits: LegacyMap<(ContractAddress, u256), u256>,
        refunds: LegacyMap<(ContractAddress, u256), u256>,
    }

    #[derive(Drop, starknet::Store)]
    struct Project {
        id: u256,
        cycle_id: u256,
        project_name: ByteArray,
        budget: u256,
        rentability_score: u256,
        is_valid: bool,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        let eth_contract_address = ETH_CONTRACT_ADDRESS.try_into().unwrap();
        self.eth_token.write(IERC20CamelDispatcher { contract_address: eth_contract_address });
        self.greeting.write("Building Unstoppable Apps!!!");
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl YourContractImpl of IYourContract<ContractState> {
        fn greeting(self: @ContractState) -> ByteArray {
            self.greeting.read()
        }
        fn set_greeting(ref self: ContractState, new_greeting: ByteArray, amount_eth: u256) {
            self.greeting.write(new_greeting);
            self.total_counter.write(self.total_counter.read() + 1);
            let user_counter = self.user_greeting_counter.read(get_caller_address());
            self.user_greeting_counter.write(get_caller_address(), user_counter + 1);

            if amount_eth > 0 {
                // call approve on UI
                self
                    .eth_token
                    .read()
                    .transferFrom(get_caller_address(), get_contract_address(), amount_eth);
                self.premium.write(true);
            } else {
                self.premium.write(false);
            }
            self
                .emit(
                    GreetingChanged {
                        greeting_setter: get_caller_address(),
                        new_greeting: self.greeting.read(),
                        premium: true,
                        value: 100
                    }
                );
        }
        fn withdraw(ref self: ContractState) {
            self.ownable.assert_only_owner();
            let balance = self.eth_token.read().balanceOf(get_contract_address());
            self.eth_token.read().transfer(self.ownable.owner(), balance);
        }
        fn premium(self: @ContractState) -> bool {
            self.premium.read()
        }

        // Start a new investment cycle
        fn start_cycle(
            ref self: ContractState, start_time: u256, end_time: u256, min_investment: u256
        ) {
            // validation checks
            assert!(start_time < end_time, "Start time must be before end time");
            assert!(min_investment > 0, "Minimum investment must be greater than 0");

            // self.ownable.assert_only_owner();
            let cycle_id = self.total_counter.read() + 1;
            let cycle = Cycle {
                id: cycle_id,
                start_time: start_time,
                end_time: end_time,
                min_investment: min_investment,
                is_active: true,
            };

            println!("Cycle started with id: {}", cycle_id);
            println!("Cycle start time: {}", start_time);

            self.cycles.write(cycle_id, cycle);
            self.emit(CycleStarted { cycle_id, start_time, end_time, min_investment });
        }
        // get active cycles
        // fn get_cycles(self: @TContractState) -> LegacyMap<u256, Cycle> {
        //     let mut active_cycles = LegacyMap::new();
        //     let total_cycles = self.total_counter.read();

        //     let mut cycle_id = 1;
        //     while cycle_id <= total_cycles {
        //         let cycle = self.cycles.read(cycle_id);
        //         if cycle.is_active {
        //             active_cycles.insert(cycle_id, cycle);
        //         }
        //         cycle_id += 1;
        //     }
        //     active_cycles
        // }

        // // Stop an existing investment cycle
        fn stop_cycle(ref self: ContractState, cycle_id: u256) {
            // self.ownable.assert_only_owner();
            let mut cycle = self.cycles.read(cycle_id);
            
            assert!(cycle.is_active, "Cycle is not active");
            cycle.is_active = false;
            self.cycles.write(cycle_id, cycle);
            self.emit(CycleStopped { cycle_id });
        }

        // Deposit funds into an open cycle
        fn deposit_in_cycle(ref self: ContractState, cycle_id: u256, amount: u256) {
            let cycle = self.cycles.read(cycle_id);
            assert!(cycle.is_active, "Cycle is not active");
            assert!(amount >= cycle.min_investment, "Amount is less than the minimum investment");

            let creditor = get_caller_address();
            let current_deposit: u256 = 50.into(); // Placeholder logic
            self.deposits.write((creditor, cycle_id), current_deposit + amount);
            self.eth_token.read().transferFrom(creditor, get_contract_address(), amount);
            self.emit(DepositMade { creditor, cycle_id, amount });
        }
        // Submit a project for an investment cycle
        fn submit_project(
            ref self: ContractState, cycle_id: u256, project_name: ByteArray, budget: u256
        ) {
            let cycle = self.cycles.read(cycle_id);
            assert!(cycle.is_active, "Cycle is not active");

            let project_id = self.total_counter.read() + 1;
            self.total_counter.write(project_id);
            let project = Project {
                id: project_id,
                cycle_id: cycle_id,
                project_name: project_name.clone(),
                budget: budget,
                rentability_score: 0.into(),
                is_valid: false,
            };
            self.projects.write(project_id, project);
            self.emit(ProjectSubmitted { project_id, cycle_id, project_name, budget });
        }

        // // Validate a project using its rentability score
        // fn validate_project(ref self: ContractState, project_id: u256, rentability_score: u256) {
        //     self.ownable.assert_only_owner();
        //     let mut project = self.projects.read(project_id);
        //     project.rentability_score = rentability_score;
        //     project.is_valid = rentability_score > 50.into(); // Example threshold for validation
        //     self.projects.write(project_id, project);
        //     self.emit(ProjectValidated { project_id, rentability_score, is_valid: project.is_valid });
        // }

        // Refund an amount to a debtor
        fn refund_amount(ref self: ContractState, debtor: ContractAddress, amount: u256) {
            let balance = self.eth_token.read().balanceOf(debtor);
            assert!(balance >= amount, "Insufficient balance for refund");

            self.eth_token.read().transferFrom(debtor, get_contract_address(), amount);
            self.refunds.write((debtor, amount), amount);
            self.emit(RefundMade { debtor, amount });
        }
    // Get the balance for a creditor in a specific cycle
    // fn get_creditor_balance(
    //     self: @ContractState, creditor: ContractAddress, cycle_id: u256
    // ) -> CreditorBalance {
    //     let paid_amount: u256 = 50.into(); // Placeholder logic
    //     let remaining_amount: u256 = 0.into(); // Placeholder logic
    //     let next_payment_date: u256 = 0.into(); // Placeholder logic
    //     let next_payment_amount: u256 = 0.into(); // Placeholder logic
    //     CreditorBalance {
    //         paid_amount, remaining_amount, next_payment_date, next_payment_amount,
    //     }
    // }

    // Get the balance for a debtor in a specific cycle
    // fn get_debtor_balance(
    //     self: @ContractState, debtor: ContractAddress, cycle_id: u256
    // ) -> DebtorBalance {
    //     let invested_amount: u256 = 100.into();
    //     let received_amount: u256 = 0.into(); // Placeholder logic
    //     let remaining_amount: u256 = 0.into(); // Placeholder logic
    //     let profit_made: u256 = 0.into(); // Placeholder logic
    //     let next_payment_amount: u256 = 0.into(); // Placeholder logic
    //     let next_payment_date: u256 = 0.into(); // Placeholder logic
    //     DebtorBalance {
    //         invested_amount,
    //         received_amount,
    //         remaining_amount,
    //         profit_made,
    //         next_payment_amount,
    //         next_payment_date,
    //     }
    // }
    // Get the history of transactions for a creditor
    // fn get_creditor_history(self: @ContractState, creditor: ContractAddress) -> LegacyMap<u256, u256> {
    //     self.deposits.iter().filter(|(k, _)| k.0 == creditor).collect()
    // }

    // // Get the history of transactions for a debtor
    // fn get_debtor_history(self: @ContractState, debtor: ContractAddress) -> LegacyMap<u256, u256> {
    //     self.deposits.iter().filter(|(k, _)| k.0 == debtor).collect()
    // }
    }
}
