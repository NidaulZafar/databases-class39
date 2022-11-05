const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri = `mongodb+srv://mongodb:mongodb@cluster1.qnbcuf7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
const collection = client.db('databaseWeek4').collection('populationRecords');
async function main() {
    try {
        await client.connect();
        calculatePopulationForYear(client, "Pakistan"),
        continentalPopulationByYearAndAge(client, 2020, "100+")
    } catch (e) {
        console.error(e);
    }
    // finally {
    //     await client.close();
    // }


}

main().catch(console.error);

const calculatePopulationForYear = async (client, Country) => {
    const pipeline = [
      {
        $match: {
          Country: `${Country}`,
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: {
              $add: [
                {
                  $toInt: "$M",
                },
                {
                  $toInt: "$F",
                },
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const result = await collection.aggregate(pipeline).toArray();
  
    await result.forEach((year) => {
      console.log(
        ` Id:${year._id}  countPopulation: ${year.countPopulation}`
      );
    });

};
  

const continentalPopulationByYearAndAge = async (client, year, age) => {
    {
        const pipeline = [
          {
            $match: {
              Country: {
                $in: [
                  "AFRICA",
                  "ASIA",
                  "EUROPE",
                  "LATIN AMERICA AND THE CARIBBEAN",
                  "NORTHERN AMERICA",
                  "OCEANIA",
                ],
              },
              Year: year,
              Age: age,
            },
          },
          {
            $addFields: {
              TotalPopulation: {
                $add: [
                  {
                    $toInt: "$M",
                  },
                  {
                    $toInt: "$F",
                  },
                ],
              },
            },
          },
        ];
      
        const result = await collection.aggregate(pipeline).toArray();
      
        await result.forEach((year) => {
          console.log(year);
        });
      };

}