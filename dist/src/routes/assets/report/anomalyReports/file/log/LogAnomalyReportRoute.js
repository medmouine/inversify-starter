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
const LOG_ANOMALY_REPORT_ROUTE_PATH = '/asset/report/anomalyReport/file/log';
let LogAnomalyReportRoute = class LogAnomalyReportRoute extends inversify_express_utils_1.BaseHttpController {
    constructor(anomalyReportService) {
        super();
        this.logAnomalyReportsService = anomalyReportService;
    }
    async createLogAnomalyReport(logAnomalyReportRequest, res, forwardCallback) {
        try {
            const report = await this.logAnomalyReportsService.submitAnomalyReport(new Date(logAnomalyReportRequest.creationTime), logAnomalyReportRequest.localHash, logAnomalyReportRequest.absoluteDiff, logAnomalyReportRequest.relativeDiff, new domain_1.ReportId(logAnomalyReportRequest.previousAnomalyReportId), new domain_1.LogId(logAnomalyReportRequest.logId));
            res.set('location', `${LOG_ANOMALY_REPORT_ROUTE_PATH}/${report.getId()}`);
            res.status(routes_1.HttpStatus.CREATED);
            res.send('Log anomaly report asset created !');
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while creating log anomaly report asset : ${err}`);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async getLogAsset(reportId, res, forwardCallback) {
        try {
            const report = await this.logAnomalyReportsService.getAnomalyReportById(new domain_1.ReportId(reportId));
            if (!report) {
                logger_1.logger.error(`Cannot find log anomaly report asset with id : ${reportId}`);
                res.sendStatus(routes_1.HttpStatus.NOT_FOUND);
                forwardCallback(res);
                return res;
            }
            res.send(report);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async getAllLogAnomalyReports(agentId, res, forwardCallback) {
        try {
            const reports = await this.logAnomalyReportsService.getAllAnomalyReports(new domain_1.AgentId(agentId));
            res.send(reports);
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agent logs: ${err}`);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/log'),
    __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], LogAnomalyReportRoute.prototype, "createLogAnomalyReport", null);
__decorate([
    inversify_express_utils_1.httpGet('/:reportId'),
    __param(0, inversify_express_utils_1.requestParam('reportId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogAnomalyReportRoute.prototype, "getLogAsset", null);
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(0, inversify_express_utils_1.queryParam('agentId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], LogAnomalyReportRoute.prototype, "getAllLogAnomalyReports", null);
LogAnomalyReportRoute = __decorate([
    inversify_express_utils_1.controller(LOG_ANOMALY_REPORT_ROUTE_PATH),
    __param(0, inversify_1.inject(types_1.default.ILogAnomalyReportService)),
    __metadata("design:paramtypes", [Object])
], LogAnomalyReportRoute);
exports.LogAnomalyReportRoute = LogAnomalyReportRoute;
//# sourceMappingURL=LogAnomalyReportRoute.js.map