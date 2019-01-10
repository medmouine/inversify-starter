"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@/constants/types");
const Repository_1 = require("@/Repository");
const LogAnomalyReportLedgerRepository_1 = require("@/Repository/asset/report/anomalyReport/file/log/LogAnomalyReportLedgerRepository");
require("@/routes/assets");
require("@/routes/participants/machine/agent");
const services_1 = require("@/services");
const LogAnomalyReportService_1 = require("@/services/asset/report/anomalyReport/file/log/LogAnomalyReportService");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const errorHandler = require("errorhandler");
const express = require("express");
const expressStatusMonitor = require("express-status-monitor");
const helmet = require("helmet");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const logger_1 = require("./logger");
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    static bootstrap() {
        return new Server();
    }
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.container = new inversify_1.Container();
        this.init();
        // create expressjs application
        const inversifyApp = new inversify_express_utils_1.InversifyExpressServer(this.container);
        // configure application
        inversifyApp.setConfig((app) => this.config(app));
        this.app = inversifyApp.build();
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config(app) {
        // add static paths
        app.use(express.static(path.join(__dirname, 'public')));
        // mount logger
        app.use(morgan('tiny', {
            stream: {
                write: (message) => logger_1.logger.info(message.trim()),
            },
        }));
        // mount json form parser
        // this.app.use(bodyParser);
        // this.app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(bodyParser.json());
        // mount query string parser
        // mount override?
        app.use(helmet());
        app.use(cors());
        app.use(compression());
        app.use(methodOverride());
        app.use(expressStatusMonitor());
        // catch 404 and forward to error handler
        app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        // error handling
        app.use(errorHandler());
    }
    /**
     * Create and return Router.
     *
     * @class Server
     * @method routes
     * @return void
     */
    init() {
        this.container.bind(types_1.default.ILedgerParticipantClient).to(Repository_1.HLFParticipantClient);
        this.container.bind(types_1.default.ILedgerAssetClient).to(Repository_1.HLFAssetClient);
        this.container.bind(types_1.default.IAgentService).to(services_1.AgentService);
        this.container.bind(types_1.default.IAgentRepository).to(Repository_1.AgentLedgerRepository);
        this.container.bind(types_1.default.ILogRepository).to(Repository_1.LogLedgerRepository);
        this.container.bind(types_1.default.ILogService).to(services_1.LogService);
        this.container.bind(types_1.default.ILogAnomalyReportRepository).to(LogAnomalyReportLedgerRepository_1.LogAnomalyReportLedgerRepository);
        this.container.bind(types_1.default.ILogAnomalyReportService).to(LogAnomalyReportService_1.LogAnomalyReportService);
    }
}
exports.Server = Server;
//# sourceMappingURL=app.js.map