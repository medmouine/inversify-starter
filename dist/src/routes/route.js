"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseRoute {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        this.router = express_1.Router();
    }
    async disconnect(name) {
        try {
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=route.js.map