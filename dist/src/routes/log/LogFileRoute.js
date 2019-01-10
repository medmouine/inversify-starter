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
const LogFile_1 = require("@/domain/logFile/LogFile");
const LogFileId_1 = require("@/domain/logFile/LogFileId");
const logger_1 = require("@/logger");
const HttpStatus_1 = require("@/routes/HttpStatus");
const LogFileRequest_1 = require("@/routes/requests/LogFileRequest");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const LOGFILE_ROUTE_PATH = '/asset/logfile';
let LogFileRoute = class LogFileRoute extends inversify_express_utils_1.BaseHttpController {
    constructor(logFileService) {
        super();
        this.logFileService = logFileService;
    }
    async getAllLogsForAgent(agentId, res, forwardCallback) {
        try {
            const logFiles = await this.logFileService.getAllLogs(new domain_1.AgentId(agentId));
            res.send(logFiles);
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agent logs: ${err}`);
            res.sendStatus(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async createLogFile(agentId, logFileRequest, res, forwardCallback) {
        try {
            const logFile = await this.logFileService.createLogFile(new domain_1.AgentId(agentId), new Date(logFileRequest.creationTime), new Date(logFileRequest.lastUpdate), logFileRequest.lastCertifiedLine, logFileRequest.exists, logFileRequest.readable, logFileRequest.location, logFileRequest.hashValue);
            res.set('location', `${agentId}${LOGFILE_ROUTE_PATH}/${logFile.getId().getValueString()}`);
            res.status(HttpStatus_1.HttpStatus.CREATED);
            res.send('Log file asset created !');
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while creating agent : ${err}`);
            res.sendStatus(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async getLogFileAsset(agentId, logFileId, res, forwardCallback) {
        try {
            const logFile = await this.logFileService.getLogFile(new domain_1.AgentId(agentId), new LogFileId_1.LogFileId(logFileId));
            if (!logFile) {
                logger_1.logger.error(`Cannot find log file asset with id : ${logFileId}`);
                res.sendStatus(HttpStatus_1.HttpStatus.NOT_FOUND);
                forwardCallback(res);
            }
            res.send(logFile);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async updateLogFileAsset(agentId, logFileId, logFileRequest, res, forwardCallback) {
        const agentIdEntity = new domain_1.AgentId(agentId);
        const logFile = new LogFile_1.LogFile(new LogFileId_1.LogFileId(logFileId), new Date(logFileRequest.creationTime), new Date(logFileRequest.lastUpdate), logFileRequest.lastCertifiedLine, logFileRequest.exists, logFileRequest.readable, logFileRequest.location, logFileRequest.hashValue, agentIdEntity);
        try {
            this.logFileService.updateLogFile(agentIdEntity, logFile);
            res.sendStatus(HttpStatus_1.HttpStatus.SUCCESS);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogFileRoute.prototype, "getAllLogsForAgent", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.requestBody()), __param(2, inversify_express_utils_1.response()), __param(3, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LogFileRequest_1.LogFileRequest, Object, Function]),
    __metadata("design:returntype", Promise)
], LogFileRoute.prototype, "createLogFile", null);
__decorate([
    inversify_express_utils_1.httpGet('/:logFileId'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.requestParam('logFileId')), __param(2, inversify_express_utils_1.response()), __param(3, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogFileRoute.prototype, "getLogFileAsset", null);
__decorate([
    inversify_express_utils_1.httpPost('/:logFileId'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.requestParam('logFileId')), __param(2, inversify_express_utils_1.requestBody()), __param(3, inversify_express_utils_1.response()), __param(4, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, LogFileRequest_1.LogFileRequest, Object, Function]),
    __metadata("design:returntype", Promise)
], LogFileRoute.prototype, "updateLogFileAsset", null);
LogFileRoute = __decorate([
    inversify_express_utils_1.controller(`/:agentId${LOGFILE_ROUTE_PATH}`),
    __param(0, inversify_1.inject(types_1.default.ILogFileService)),
    __metadata("design:paramtypes", [Object])
], LogFileRoute);
exports.LogFileRoute = LogFileRoute;
//# sourceMappingURL=LogFileRoute.js.map