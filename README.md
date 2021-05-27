## Description
This is the Monorepo of transaction backend , this repo based on [NodeJs] and [TypeScript]
We have two type of schema:
    - userSchema:
        - id
        - Email
        - firstName
        - lastName
    - transaction:
        - id
        - date
        - countryCode
        - currency
        - OrginValue
        - transferValue
        - decision
        - userId
To enable to make an transaction you should create a user account.Follow Routers documentation in the last section to know how create user account and handle the API.
## Installation
```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run dev
```

## Test
```bash
# unit tests
$ npm run test

```

## Routers documentation

# Description
This Monorepo hold three differents API to handle transaction.
# To Add User POST(/users):
    request:{"email":"ahmad.shaheen@gmail.com","firstName":"mohammad","lastName":"shahin"}
    response:"true/false"
# To transffer currency POST(/transcations)
    request:{"currency":"EUR","value":40,"countryCode":"DE","userId":"60ae36d942b6014a0800cda8"}
    response:"reject/approve"
# To get all transaction GET(/transcations):
    request:{email:moabo.shahin@gmail.com}
    response:[{}]

## To run the API, you can use the postman collection "transactions.postman_collection" in the main-folder

