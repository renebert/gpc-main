export class Rank {
	id: number = 0;
	code: string = "";
	description: string = "";
	dlRequired: number = 0;
	dlRankCodeEq: string = "";
	dlRank?: Rank;
}

export class Incentive {
	id: number = 0;
	code: string = "";
	description: string = "";
	rate: number = 0;
}
