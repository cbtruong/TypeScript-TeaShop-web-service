import mongoose from "mongoose";
import mongdb_config from "../configs/mongdb_config";


class Database {
  private static instance: Database;
  private config = mongdb_config

  constructor() {
    this.connect()
  }

  private async connect() {
    try {
      const { host, name, port } = this.config.db
      const connectString = `mongodb://${host}:${port}/${name}`
      await mongoose.connect(connectString)
      console.log(`Mongodb connect success::`, connectString);
    } catch (error) {
      console.log(`error::`, error)
    }
  }

  public static getIntance(): Database {
    if (!Database.instance)
      Database.instance = new Database()
    return Database.instance
  }
}

const instance = Database.getIntance()
