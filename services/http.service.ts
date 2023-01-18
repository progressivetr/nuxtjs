import axios from "axios/index";

export const defaultMongoDBFields = {
    "collection": "documents",
    "database": "test",
    "dataSource": "Cluster0",
}

const mongoDBClient = axios.create({
    baseURL: 'https://data.mongodb-api.com/app/data-vstdn/endpoint/data/v1/action',
    headers: {
        'api-key': 'Xl7zKo3gnUuEObpuar5o7hvEwYYVp56K5jwlKy4It1AjKDpIn9ABsrwBhZjC7xFV'
    }
})

export default mongoDBClient;
