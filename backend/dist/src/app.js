"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config 
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// init middleware
app.use((0, morgan_1.default)('dev'));
app.use((0, compression_1.default)());
app.use(helmet_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// init database
require("./dbs/init_mongodb");
// init handler error
exports.default = app;
