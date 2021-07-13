export class Rank {
	id: number = 0;
	code: string = "";
	description: string = "";
	dlRequired: number = 0;
	dlRankId: number = 0;
	dlRank?: Rank;
}

export class Incentive {
	id: number = 0;
	code: string = "";
	description: string = "";
	rate: number = 0;
}
