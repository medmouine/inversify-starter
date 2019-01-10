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
const types_1 = require("../../../../constants/types");
const index_1 = require("../../../../logger/index");
const inversify_1 = require("inversify");
let LogService = class LogService {
    constructor(logRepository) {
        this.logRepository = logRepository;
    }
    async getAllLogs(agentId) {
        try {
            return this.logRepository.getAllLogs(agentId);
        }
        catch (err) {
            index_1.logger.error(`Error while creating Log file asset : ${err}`);
            throw (err);
        }
    }
    async createLog(agentId, creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue) {
        try {
            return await this.logRepository.createLogAsset(agentId, creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue);
        }
        catch (err) {
            index_1.logger.error(`Error while creating Log file asset : ${err}`);
            throw err;
        }
    }
    async getLog(agentId, logId) {
        try {
            return await this.logRepository.getLogAsset(agentId, logId);
        }
        catch (err) {
            index_1.logger.error(`Error while fetching Log file asset : ${err}`);
            throw err;
        }
    }
    updateLog(agentId, log) {
        try {
            this.logRepository.updateLogAsset(agentId, log);
        }
        catch (err) {
            index_1.logger.error(`Error while updating Log file asset : ${err}`);
            throw err;
        }
    }
};
LogService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ILogRepository)),
    __metadata("design:paramtypes", [Object])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=LogService.js.map