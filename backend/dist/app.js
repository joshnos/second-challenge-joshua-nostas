"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const data_source_1 = require("./utils/data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../env/.env') });
data_source_1.AppDataSource.initialize().then(async () => {
    // create express app
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    // register express routes from defined application routes
    routes_1.Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // start express server
    app.listen(3001);
    console.log("Express server has started on port 3001. Open http://localhost:3001/posts to see results");
}).catch(error => console.log(error));
//# sourceMappingURL=app.js.map