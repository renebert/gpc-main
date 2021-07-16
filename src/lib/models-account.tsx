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
	discount: number = 0;
}

export class AccountTransactionSet {
	transactions: AccountTransaction[] = [];
	amount: number = 0;
	pointValue: number = 0;
	discount: number = 0;
}

export class IncentiveRates {
	dSC: number = 0;
	pSC: number = 0;
	gSC: number = 0;
	lSC: number = 0;
}

export class AccountModel {
	rank: Rank = new Rank();
	breakAways: string[] = [];
	incentiveRates: IncentiveRates = new IncentiveRates();
	account: GPCAccount = new GPCAccount();
	transactions: AccountTransactionSet = new AccountTransactionSet();
	downlines: AccountModel[] = [];
	psc: number = 0;
	gsc: number = 0;
	lsc: number = 0;
	totalCommissions: number = 0;
	pointValue: number = 0;
	amount: number = 0;
	discount: number = 0;
	dlAmount: number = 0;
	dlPointValue: number = 0;
	dlDiscount: number = 0;
}
