import {$fetch} from "ofetch";

export default defineEventHandler(async event => {
    const request = await $fetch('aggregate', {
        baseURL: 'https://data.mongodb-api.com/app/data-vstdn/endpoint/data/v1/action',
        headers: {
            'api-key': 'Xl7zKo3gnUuEObpuar5o7hvEwYYVp56K5jwlKy4It1AjKDpIn9ABsrwBhZjC7xFV'
        },
        method: 'POST',
        body: {
            "collection": "documents",
            "database": "test",
            "dataSource": "Cluster0",
            "pipeline": [
                {
                    "$group": {
                        "_id": null,
                        "regions": {
                            "$addToSet": "$region"
                        }
                    }
                }
            ]
        }
    });
    return request.documents[0].regions;
});
