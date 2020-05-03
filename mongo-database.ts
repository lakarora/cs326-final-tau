import {secrets} from './../cs326-final-tau/secrets';

export class Database {
    private MongoClient = require('mongodb').MongoClient;
    private uri = secrets.mongoUri;
    private client;
    private db;

    constructor() {
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true});
        // Open up a connection to the client
        console.log('hi');
        (async () => {
            await this.client.connect().catch(err => { console.log(err); });
            console.log('Successfully connected to the database');
        })();
    }


    public async get(query, collectionName: string) : Promise<any> {
        let collection = this.db.collection(collectionName);
        let result = await collection.findOne(query);
        return result;
    }
}   