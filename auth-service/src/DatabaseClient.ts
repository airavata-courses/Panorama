import * as mongoDb from "mongodb";
import config from "./config.json";

export default class DatabaseClient {

    private static _instance: DatabaseClient = undefined;
    client: mongoDb.MongoClient;

    private constructor() {
        const uri = process.env.Mongo_uri_auth ? process.env.Mongo_uri_auth : config.mongoUri;
        this.client = new mongoDb.MongoClient(uri + config.mongoDatabase, { useUnifiedTopology: true, useNewUrlParser: true });
    }

    public static get Instance(): DatabaseClient {
        if (!this._instance) {
            this._instance = new DatabaseClient();
        }
        return this._instance;
    }

    public async findOne(collectionName: string, query: object): Promise<object> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB\n" + err);
            return undefined;
        }

        const database = this.client.db(config.mongoDatabase);
        const collection = database.collection(collectionName)
        try {
            console.log("query " + JSON.stringify(query));
            const result = await collection.findOne(query);
            console.log("resutl " + JSON.stringify(result));
            return result as object;
        } catch (err) {
            console.log("Error while executing query on collections\n" + err);
            return undefined;
        }
    }

    public async upsertOne(collectionName: string, insertQuery: object, updateQuery: object): Promise<object> {
        try {
            if (!this.client.isConnected()) {
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB\n" + err);
            return undefined;
        }

        const database = this.client.db(config.mongoDatabase);
        const collection = database.collection(collectionName)
        try {
            const result = await collection.updateOne(insertQuery, { $set: updateQuery }, { upsert: true });
            return result as object;
        } catch (err) {
            console.log("Error while executing query on collections\n" + err);
            return undefined;
        }
    }

}
