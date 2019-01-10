"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@/constants/types");
const domain_1 = require("@/domain");
const logger_1 = require("@/logger");
const routes_1 = require("@/routes");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const LOG_ROUTE_PATH = '/asset/file/log';
let LogRoute = class LogRoute extends inversify_express_utils_1.BaseHttpController {
    constructor(logService) {
        super();
        this.logService = logService;
    }
    async getAllLogsForAgent(agentId, res, forwardCallback) {
        try {
            const logs = await this.logService.getAllLogs(new domain_1.AgentId(agentId));
            res.send(logs);
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agent logs: ${err}`);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async createLog(logRequest, res, forwardCallback) {
        try {
            const log = await this.logService.createLog(new domain_1.AgentId(logRequest.agentId), new Date(logRequest.creationTime), new Date(logRequest.lastUpdate), logRequest.lastCertifiedLine, logRequest.exists, logRequest.readable, logRequest.location, logRequest.hashValue);
            res.set('location', `${LOG_ROUTE_PATH}/${log.getId().getStringValue()}?agentId=${log.getAgentId().getStringValue()}`);
            res.status(routes_1.HttpStatus.CREATED);
            res.send('Log file asset created !');
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while creating agent : ${err}`);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async getLogAsset(logId, res, forwardCallback) {
        try {
            const log = await this.logService.getLog(new domain_1.LogId(logId));
            if (!log) {
                logger_1.logger.error(`Cannot find log file asset with id : ${logId}`);
                res.sendStatus(routes_1.HttpStatus.NOT_FOUND);
                forwardCallback(res);
            }
            res.send(log);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async updateLogAsset(agentId, logId, logRequest, res, forwardCallback) {
        const agentIdEntity = new domain_1.AgentId(agentId);
        const log = new domain_1.Log(new domain_1.LogId(logId), new Date(logRequest.creationTime), new Date(logRequest.lastUpdate), logRequest.lastCertifiedLine, logRequest.exists, logRequest.readable, logRequest.location, logRequest.hashValue, agentIdEntity);
        try {
            await this.logService.updateLog(log);
            res.sendStatus(routes_1.HttpStatus.SUCCESS);
            res.set('location', `${LOG_ROUTE_PATH}/${logId}`);
            res.send('Log file asset updated !');
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(0, inversify_express_utils_1.queryParam('agentId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogRoute.prototype, "getAllLogsForAgent", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], LogRoute.prototype, "createLog", null);
__decorate([
    inversify_express_utils_1.httpGet('/:logId'),
    __param(0, inversify_express_utils_1.requestParam('logId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogRoute.prototype, "getLogAsset", null);
__decorate([
    inversify_express_utils_1.httpPost('/:logId'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.requestParam('logId')), __param(2, inversify_express_utils_1.requestBody()), __param(3, inversify_express_utils_1.response()), __param(4, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], LogRoute.prototype, "updateLogAsset", null);
LogRoute = __decorate([
    inversify_express_utils_1.controller(LOG_ROUTE_PATH),
    __param(0, inversify_1.inject(types_1.default.ILogService)),
    __metadata("design:paramtypes", [Object])
], LogRoute);
exports.LogRoute = LogRoute;
//# sourceMappingURL=LogRoute.js.map