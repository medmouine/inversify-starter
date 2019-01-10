"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@/logger");
const config = require("config");
const route_1 = require("./route");
/**
 * / route
 *
 * @class User
 */
class ApiRoutes extends route_1.BaseRoute {
    // @Inject
    // private agentRoute: AgentRoute;
    /**
     * @class ApiRoutes
     * @constructor
     */
    constructor() {
        super();
        ApiRoutes.get = ApiRoutes.get.bind(this);
        this.init();
    }
    /**
     * @class ApiRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    static async get(req, res, next) {
        res.status(200).json({ online: true });
    }
    getRouter() {
        return this.router;
    }
    /**
     * @class ApiRoute
     * @method init
     */
    init() {
        // log
        logger_1.logger.info(`Starting on port ${config.get('port')}`);
        logger_1.logger.info('[ApiRoute] Creating api routes.');
        // add index page route
        this.router.get(ApiRoutes.path, ApiRoutes.get);
    }
}
/**
 * @class ApiRoute
 * @method getRouter
 * @returns {Router}
 */
ApiRoutes.path = '/';
exports.ApiRoutes = ApiRoutes;
__export(require("./HttpStatus"));
__export(require("./assets/file/log"));
__export(require("./participants/machine/agent"));
//# sourceMappingURL=index.js.map