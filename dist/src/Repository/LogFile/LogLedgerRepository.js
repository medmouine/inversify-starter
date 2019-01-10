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
const Log_1 = require("@/domain/asset/file/log/Log");
const LogId_1 = require("@/domain/asset/file/log/LogId");
const ResourceTypes_1 = require("@/domain/provider/resource/ResourceTypes");
const logger_1 = require("@/logger");
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
let LogLedgerRepository = class LogLedgerRepository {
    constructor(client) {
        this.client = client;
    }
    static mapAgentJsonToAgentEntity(logJson) {
        return new Log_1.Log(new LogId_1.LogId(logJson.id), logJson.creationTime, logJson.lastUpdate, logJson.lastCertifiedLine, logJson.exists, logJson.readable, logJson.location, logJson.hashValue, logJson.adgentId);
    }
    async getAllLogs(agentId) {
        logger_1.logger.info(`Getting all log file asset on ledger for agent : ${agentId}`);
        try {
            const logAssetRegistry = await this.getLogFileRegistry();
            const allLogFilesJson = await logAssetRegistry.getAll();
            const allLogFilesEntities = allLogFilesJson.map((logJson) => LogFileLedgerRepository.mapAgentJsonToAgentEntity(logJson));
            return allLogFilesEntities.filter((logEntity) => logEntity.getAgentId().getStringValue() === agentId.getStringValue());
        }
        catch (err) {
            logger_1.logger.error(`Error while getting log file with id ${agentId} : ${err}`);
            throw err;
        }
    }
    async createLogFileAsset(agentId, creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue) {
        logger_1.logger.info('Creating log file asset on ledger...');
        const logId = uuid_1.v4();
        const log = new LogFile(new LogFileId(logId), creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue, agentId);
        try {
            const logResource = this.generateNewLogFileResource(log);
            const logRegistry = await this.getLogFileRegistry();
            logRegistry.add(logFileResource);
            return logFile;
        }
        catch (err) {
            logger_1.logger.error(`Error while submitting log file resource to registry: ${err}`);
            throw err;
        }
    }
    async getLogFileAsset(agentId, logFileId) {
        try {
            const logFileRegistry = await this.getLogFileRegistry();
            const logFileJson = JSON.parse(await logFileRegistry.get(logFileId.getValueString()));
            return LogFileLedgerRepository.mapAgentJsonToAgentEntity(logFileJson);
        }
        catch (err) {
            logger_1.logger.error(`Error while getting log file with id ${logFileId} : ${err}`);
            throw err;
        }
    }
    async updateLogFileAsset(agentId, logFile) {
        logger_1.logger.info('Updating log file asset on ledger...');
        try {
            const logFileResource = this.generateNewLogFileResource(logFile);
            const logFileRegistry = await this.getLogFileRegistry();
            logFileRegistry.update(logFileResource);
        }
        catch (err) {
            logger_1.logger.error(`Error while updating log file resource to registry: ${err}`);
            throw err;
        }
    }
    async generateNewLogFileResource(logFile) {
        try {
            const logFileResource = await this.client.createAssetResource(ResourceTypes_1.ResourceTypes.LOGFILE, logFile.getId().getValueString());
            logFileResource.setPropertyValue(LogFileLedgerRepository.CREATING_TIME, logFile.getCreatingTime());
            logFileResource.setPropertyValue(LogFileLedgerRepository.LAST_UPDATE, logFile.getLastUpdate());
            logFileResource.setPropertyValue(LogFileLedgerRepository.LAST_CERTIFIED_LINE, logFile.getLastCertifiedLine());
            logFileResource.setPropertyValue(LogFileLedgerRepository.EXISTS, logFile.isExisting());
            logFileResource.setPropertyValue(LogFileLedgerRepository.READABLE, logFile.isReadable());
            logFileResource.setPropertyValue(LogFileLedgerRepository.LOCATION, logFile.getLocation());
            logFileResource.setPropertyValue(LogFileLedgerRepository.HASH_VALUE, logFile.getHashValue());
            logFileResource.setPropertyValue(LogFileLedgerRepository.AGENT_ID, logFile.getAgentId());
            return logFileResource;
        }
        catch (err) {
            logger_1.logger.error(`cannot obtain log file resource template from ledger client : ${err}`);
            throw err;
        }
    }
    async getLogFileRegistry() {
        try {
            return await this.client.getAssetRegistry(ResourceTypes_1.ResourceTypes.LOGFILE.toString());
        }
        catch (err) {
            logger_1.logger.error(`Cannot obtain log file asset registry from ledger client : ${err}`);
            throw err;
        }
    }
};
LogLedgerRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ILedgerAssetClient)),
    __metadata("design:paramtypes", [Object])
], LogLedgerRepository);
exports.LogLedgerRepository = LogLedgerRepository;
//# sourceMappingURL=LogLedgerRepository.js.map