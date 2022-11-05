# Instructions to import CSV data into database

Install Atlas CLI to Manage Your Cluster From the Command Line Interface
brew install mongodb-atlas-cli 

verify Atlas has been installed
atlas  

check the version of atlas
atlas --version    

Install mongodb database tools
brew tap mongodb/brew    
brew install mongodb-database-tools  

verify installation successful
brew list | grep mongodb-database-tools

syntax to import CSV file (last field --headerline is required to import csv file but not for json)
mongoimport --uri mongodb+srv://mongodb:mongodb@cluster1.qnbcuf7.mongodb.net/databaseWeek4 --collection populationRecords --type csv --file population_pyramid_1950-2022.csv --headerline