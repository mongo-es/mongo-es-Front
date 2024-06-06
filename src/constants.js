//초기 코드값

export const default_VALUE = {

    bson: ` 
    [
        {
          $match: {
            birthdate: {
              $gte: new Date("1990-01-01")
            }
          }
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accounts",
            foreignField: "account_id",
            as: "account_details"
          }
        },
        {
          $unwind: "$account_details"
        },
        {
          $match: {
            "account_details.limit": {
              $gte: 1000
            }
          }
        },
        {
          $project: {
            _id: 0,
            username: 1,
            name: 1,
            email: 1,
            accountLimit: "$account_details.limit"
          }
        }
    ]
    `
};
