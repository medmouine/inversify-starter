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
let AgentService = class AgentService {
    constructor(agentRepository) {
        this.agentRepository = agentRepository;
    }
    async createAgent(location, platform) {
        try {
            return await this.agentRepository.createAgent(location, platform);
        }
        catch (err) {
            logger_1.logger.error(`Error creating agent : ${err}`);
            throw err;
        }
    }
    async getAgent(agentId) {
        try {
            return this.agentRepository.getAgent(agentId);
        }
        catch (err) {
            logger_1.logger.error('Error getting agent information :' + err);
            throw err;
        }
    }
    async getAllAgents() {
        try {
            return this.agentRepository.getAllAgents();
        }
        catch (err) {
            throw err;
        }
    }
};
AgentService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.IAgentRepository)),
    __metadata("design:paramtypes", [Object])
], AgentService);
exports.AgentService = AgentService;
//# sourceMappingURL=AgentService.js.map