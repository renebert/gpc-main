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
}

export class AccountTransaction {
	order: AccountOrder = new AccountOrder();
	items: AccountOrderItem[] = [];
	amount: number = 0;
	itemized: TransactionItem[] = [];
}

export class AccountTransactionSet {
	transactions: AccountTransaction[] = [];
	amount: number = 0;
}
