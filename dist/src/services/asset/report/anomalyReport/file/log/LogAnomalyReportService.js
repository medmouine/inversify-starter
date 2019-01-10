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
const logger_1 = require("@/logger");
const inversify_1 = require("inversify");
let LogAnomalyReportService = class LogAnomalyReportService {
    constructor(logAnomalyReportRepository, logRepository) {
        this.logAnomalyReportRepository = logAnomalyReportRepository;
        this.logRepository = logRepository;
    }
    async getAllAnomalyReports(agentId) {
        try {
            if (!agentId) {
                return await this.logAnomalyReportRepository.getAllAnomalyReports();
            }
            return await this.getAllReportsForSpecificAgent(agentId);
        }
        catch (err) {
            throw err;
        }
    }
    async getAnomalyReportById(reportId) {
        try {
            return await this.logAnomalyReportRepository.getLogAnomalyReportById(reportId);
        }
        catch (err) {
            throw err;
        }
    }
    async submitAnomalyReport(creationTime, localHash, absoluteDiff, relativeDiff, previousAnomalyReportId, logId) {
        try {
            return await this.logAnomalyReportRepository.submitLogAnomalyReport(creationTime, localHash, absoluteDiff, relativeDiff, previousAnomalyReportId, logId);
        }
        catch (err) {
            throw err;
        }
    }
    async getAllReportsForSpecificAgent(agentId) {
        try {
            const logsForAgent = await this.logRepository.getAllLogsForAgent(agentId);
            const logIds = logsForAgent.map((log) => log.getId());
            return await this.logAnomalyReportRepository.getAllAnomalyReportsForMultipleLogs(logIds);
        }
        catch (err) {
            logger_1.logger.error(`Could not get anomaly reports for agent ${agentId} : ${err}`);
            throw err;
        }
    }
};
LogAnomalyReportService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ILogAnomalyReportRepository)),
    __param(1, inversify_1.inject(types_1.default.ILogRepository)),
    __metadata("design:paramtypes", [Object, Object])
], LogAnomalyReportService);
exports.LogAnomalyReportService = LogAnomalyReportService;
//# sourceMappingURL=LogAnomalyReportService.js.map