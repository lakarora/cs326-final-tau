import {secrets} from './../cs326-final-tau/secrets';

export class Database {
    private MongoClient = require('mongodb').MongoClient;
    private uri = secrets.mongoUri;
    private client;
    private db;

    constructor() {
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true});
        // Open up a connection to the client
        (async () => {
            await this.client.connect().catch(err => { console.log(err); });
            this.db = this.client.db('PassageDB');
            console.log('Successfully connected to the database');
        })();
    }


    public async get(query, collectionName: string) : Promise<any> {
        let db1 =  this.client.db("PassageDB");
        let collection = db1.collection(collectionName);
        let result = await collection.findOne(query);
        return result;
    }

    public async putOne(query, collectionName: string) : Promise<string> {
        let collection = this.db.collection(collectionName);
        let result = await collection.insertOne(query).then(
            val => {
                return 'success';
            },
            reason => {
                return 'failure';
            }
        );
        return result;
    }
}   