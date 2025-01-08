As for running the server please follow the instructions

1. Install all node modules by running the command npm install on your termimal
    -npm install
2. Create a .env file and paste these:
    PORT=8001
    FILE_NAME=Trello_Cards
    TRELLO_API_KEY=8b5d01772b5456d7c62febacebcf5486
    TRELLO_API_TOKEN=ATTA9ec57c8d88f5201f806195a355780fddacfb459141a22a0cb82b18fe94f3feb792AB0948
PS. Dont Change the variable name but you can always change the values.
3. Change the variable values if you will test your own trello account just put your API KEY and API TOKEN. Please refer to this link to generate your own trello key and token.
https://www.merge.dev/blog/trello-api-key

4. To run the server please run the command:
    -npm start
PS. you can see the server running if you see "Server running in 8001" in your terminal
5. To test the API open postman and select get and paste localhost:8001/api/trello/getCards to test the API

6. After executing the API it will create a csv file if file is not existing and will append data when file is existed.

NOTE: Please follow all the steps to proceed smoothly.
