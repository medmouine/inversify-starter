"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@/logger");
const config = require("config");
require("reflect-metadata");
const app_1 = require("./app");
require("./routes/participants/machine/agent/AgentRoute");
// create http server
exports.app = app_1.Server.bootstrap().app;
exports.server = exports.app.listen(config.get('port'));
logger_1.logger.info(`listening on port ${config.get('port')}`);
//# sourceMappingURL=index.js.map