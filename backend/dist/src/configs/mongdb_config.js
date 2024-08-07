"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEV = {
    app: {
        port: Number(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        name: process.env.DEV_DB_NAME || 'TEA-SHOP-BACKEND-DEV',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: Number(process.env.DEV_DB_PORT) || 27017
    }
};
const enviroments = { DEV };
const node_env = process.env.NODE_ENV || 'DEV';
exports.default = enviroments[node_env];
