import { AccountOrder, AccountOrderItem } from "./models-inventory";

export class AccountTransaction {
	order: AccountOrder = new AccountOrder();
	items: AccountOrderItem[] = [];
}
