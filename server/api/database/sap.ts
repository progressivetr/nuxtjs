import {$fetch} from "ofetch";

export default defineEventHandler(async event => {
    const query = getQuery(event);
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
                    "$match": {
                        "region": query.region,
                        "os": query.os,
                    }
                },
                {
                    "$group": {
                        "_id": null,
                        "regions": {
                            "$addToSet": "$sap"
                        }
                    }
                }
            ]
        }
    });
    if(!request.documents.length) {
        return [];
    }
    return request.documents[0].regions;
});
