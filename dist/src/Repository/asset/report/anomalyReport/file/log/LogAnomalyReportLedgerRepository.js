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
const LogAnomalyReportAssembler_1 = require("@/Repository/assembler/asset/report/anomalyReport/file/log/LogAnomalyReportAssembler");
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
let LogAnomalyReportLedgerRepository = class LogAnomalyReportLedgerRepository {
    constructor(client) {
        this.client = client;
        this.logAnomalyReportAssembler = new LogAnomalyReportAssembler_1.LogAnomalyReportAssembler(this.client);
    }
    async getAllAnomalyReports() {
        try {
            const logAnomalyReportRegistry = await this.client.getAssetRegistry(domain_1.ResourceType.LOG_ANOMALY_REPORT);
            const reportAssets = await logAnomalyReportRegistry.getAll();
            return await reportAssets.map((report) => this.logAnomalyReportAssembler.toEntity(report));
        }
        catch (err) {
            logger_1.logger.error(`Cannot get all log anomaly Reports : ${err}`);
            throw err;
        }
    }
    async getAllAnomalyReportsForMultipleLogs(logsIds) {
        try {
            const reports = await this.getAllAnomalyReports();
            return reports.filter((report) => this.reportIsRelatedToAnyOf(report, logsIds));
        }
        catch (err) {
            throw err;
        }
    }
    async getLogAnomalyReportById(reportId) {
        try {
            const logAnomalyReportAssetRegistry = await this.client.getAssetRegistry(domain_1.ResourceType.LOG_ANOMALY_REPORT);
            const reportAsset = await logAnomalyReportAssetRegistry.get(reportId.getStringValue());
            return this.logAnomalyReportAssembler.toEntity(reportAsset);
        }
        catch (err) {
            logger_1.logger.error(`Could not get anomaly report with id ${reportId} : ${err}`);
            throw err;
        }
    }
    async submitLogAnomalyReport(creationTime, localHash, absoluteDiff, relativeDiff, previousAnomalyReportId, logId) {
        try {
            const reportEntity = new domain_1.LogAnomalyReport(new domain_1.ReportId(uuid_1.v4()), creationTime, localHash, absoluteDiff, relativeDiff, previousAnomalyReportId, logId);
            const reportAsset = await this.logAnomalyReportAssembler.toAsset(reportEntity);
            const logAnomalyReportAssetRegistry = await this.client.getAssetRegistry(domain_1.ResourceType.LOG_ANOMALY_REPORT);
            logAnomalyReportAssetRegistry.add(reportAsset);
            return reportEntity;
        }
        catch (err) {
            logger_1.logger.error(` Could not submit anomaly report to ledger : ${err}`);
            throw err;
        }
    }
    reportIsRelatedToAnyOf(report, logsIds) {
        return !!logsIds.find((logId) => logId === report.getRelatedAssetId());
    }
};
LogAnomalyReportLedgerRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ILedgerAssetClient)),
    __metadata("design:paramtypes", [Object])
], LogAnomalyReportLedgerRepository);
exports.LogAnomalyReportLedgerRepository = LogAnomalyReportLedgerRepository;
//# sourceMappingURL=LogAnomalyReportLedgerRepository.js.map