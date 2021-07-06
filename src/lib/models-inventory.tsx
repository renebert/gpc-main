import { GPCAccount, QuickProfile } from "./models";

export class Unit {
	id: number = 0;
	unit: string = "";
}

export class Category {
	id: number = 0;
	category: string = "";
}

export class Warehouse {
	id: number = 0;
	warehouse: string = "";
	accountNo: string = "";
	account?: GPCAccount;
}

export class Stock {
	id: number = 0;
	stockName: string = "";
	description: string = "";
	unitId: number = 0;
	categoryId: number = 0;
	unit?: Unit;
	category?: Category;
}

export class InventoryDoc {
	id: number = 0;
	docDate: Date = new Date();
	description: string = "";
	warehouseId: number = 0;
	remarks: string = "";
	isConfirmed: boolean = false;
	dateConfirmed?: Date;
	conrirmedByProfileId?: number;
	confirmedBy?: QuickProfile;
	warehouse?: Warehouse;
	itemCount: number = 0;
}

export class InventoryDocItem {
	id: number = 0;
	parentId: number = 0;
}

export class Delivery extends InventoryDoc {
	poNo: string = "";
	drNo: string = "";
	amount: number = 0;
	supplier: string = "";
}

export class DeliveryItem extends InventoryDocItem {
	stockId: number = 0;
	qty: number = 0;
	price?: number = 0;
	stock?: Stock;
}

export class PriceList extends InventoryDoc {}

export class PriceListItem extends InventoryDocItem {
	stockId: number = 0;
	price: number = 0;
	stock?: Stock;
}

export class AccountOrder extends InventoryDoc {
	accountNo: string = "";
	account?: GPCAccount;
	amount: number = 0;
}

export class AccountOrderItem extends InventoryDocItem {
	stockId: number = 0;
	qty: number = 0;
	price: number = 0;
	stock?: Stock;
	amount: number = 0;
}

export class WarehouseOrder extends InventoryDoc {
	toWarehouseId: number = 0;
}

export class WarehouseOrderItem extends InventoryDocItem {
	stockId: number = 0;
	qty: number = 0;
	price: number = 0;
	stock?: Stock;
}

export class Inventory {
	id: number = 0;
	qty: number = 0;
	price: number = 0;
	stock?: Stock;
}
