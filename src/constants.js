//초기 코드값

export const default_VALUE = {

	bson: `[
	{
		$match: {
				transaction_count : {$gt: 30}
			}
	},
	{
		$project :{
			"account_id" : 1
		}
	},
	{
		$limit: 10
	}
]`
};
