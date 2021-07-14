import { GPCAccount } from "./models";
import { Rank } from "./models-bm";
import { AccountOrder, AccountOrderItem, Stock } from "./models-inventory";

export class TransactionItem {
	id: number = 0;
	docDate: Date = new Date();
	orNo: string = "";
	stockId: number = 0;
	qty: number = 0;
	price: number = 0;
	stock?: Stock;
	amount: number = 0;
	pointValue: number = 0;
}

export class AccountTransaction {
	order: AccountOrder = new AccountOrder();
	items: AccountOrderItem[] = [];
	amount: number = 0;
	pointValue: number = 0;
	itemized: TransactionItem[] = [];
}

export class AccountTransactionSet {
	transactions: AccountTransaction[] = [];
	amount: number = 0;
	pointValue: number = 0;
}

export class AccountModel {
	accountModelParams: DefaultAccountModelParams =
		new DefaultAccountModelParams();
	account: GPCAccount = new GPCAccount();
	transactions: AccountTransactionSet = new AccountTransactionSet();
	downlines: AccountModel[] = [];
	rank: Rank = new Rank();
	dlAmount: number = 0;
	dlPointValue: number = 0;
}

export class DefaultAccountModelParams {
	accountNo: string = "";
	noTransactions: boolean = true;
	startDate = new Date();
	endDate = new Date();
	noDownlines: boolean = true;
	downlineLevelLimit: number = -1;
	downlineLevel: number = 0;
}
