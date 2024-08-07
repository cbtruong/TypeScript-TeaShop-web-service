"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongdb_config_1 = __importDefault(require("../configs/mongdb_config"));
class Database {
    constructor() {
        this.config = mongdb_config_1.default;
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { host, name, port } = this.config.db;
                const connectString = `mongodb://${host}:${port}/${name}`;
                yield mongoose_1.default.connect(connectString);
                console.log(`Mongodb connect success::`, connectString);
            }
            catch (error) {
                console.log(`error::`, error);
            }
        });
    }
    static getIntance() {
        if (!Database.instance)
            Database.instance = new Database();
        return Database.instance;
    }
}
const instance = Database.getIntance();
