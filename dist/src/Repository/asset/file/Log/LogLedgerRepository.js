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
const domain_2 = require("@/domain");
const domain_3 = require("@/domain");
const logger_1 = require("@/logger");
const LogAssembler_1 = require("@/Repository/assembler/asset/file/LogAssembler");
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
let LogLedgerRepository = class LogLedgerRepository {
    constructor(client) {
        this.client = client;
        this.logAssembler = new LogAssembler_1.LogAssembler(this.client);
    }
    async getAllLogsForAgent(agentId) {
        logger_1.logger.info(`Getting all log file asset on ledger for agent : ${agentId}`);
        try {
            const logAssetRegistry = await this.getLogRegistry();
            const allLogsAsset = await logAssetRegistry.getAll();
            const allLogsEntities = await allLogsAsset.map((logJson) => this.logAssembler.toEntity(logJson));
            return allLogsEntities.filter((logEntity) => logEntity.getAgentId().getStringValue() === agentId.getStringValue());
        }
        catch (err) {
            logger_1.logger.error(`Error while getting log file with id ${agentId} : ${err}`);
            throw err;
        }
    }
    async createLogAsset(agentId, creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue) {
        logger_1.logger.info('Creating log file asset on ledger...');
        const logId = uuid_1.v4();
        const log = new domain_1.Log(new domain_2.LogId(logId), creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue, agentId);
        try {
            const logResource = await this.logAssembler.toAsset(log);
            const logRegistry = await this.getLogRegistry();
            logRegistry.add(logResource);
            return log;
        }
        catch (err) {
            logger_1.logger.error(`Error while submitting log file resource to registry: ${err}`);
            throw err;
        }
    }
    async getLogAsset(logId) {
        try {
            const logRegistry = await this.getLogRegistry();
            const logAsset = await logRegistry.get(logId.getStringValue());
            return await this.logAssembler.toEntity(logAsset);
        }
        catch (err) {
            logger_1.logger.error(`Error while getting log file with id ${logId} : ${err}`);
            throw err;
        }
    }
    async updateLog(log) {
        logger_1.logger.info('Updating log file asset on ledger...');
        try {
            const logResource = await this.logAssembler.toAsset(log);
            const logRegistry = await this.getLogRegistry();
            logRegistry.update(logResource);
        }
        catch (err) {
            logger_1.logger.error(`Error while updating log file resource to registry: ${err}`);
            throw err;
        }
    }
    async getAllLogs() {
        try {
            const logRegistry = await this.getLogRegistry();
            return logRegistry.getAll();
        }
        catch (err) {
            logger_1.logger.error(`Could not get all logs from ledger : ${err}`);
        }
    }
    async getLogRegistry() {
        try {
            return await this.client.getAssetRegistry(domain_3.ResourceType.LOG.toString());
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