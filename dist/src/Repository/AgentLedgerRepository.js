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
var AgentLedgerRepository_1;
const types_1 = require("@/constants/types");
const domain_1 = require("@/domain");
const logger_1 = require("@/logger");
const provider_1 = require("@/Repository/provider");
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
const ResourceTypes_1 = require("@/domain/ResourceTypes");
let AgentLedgerRepository = AgentLedgerRepository_1 = class AgentLedgerRepository {
    constructor(client) {
        this.LOCATION = 'location';
        this.PLATFORM = 'platform';
        this.client = client;
    }
    static mapAgentJsonToAgentEntity(agentJson) {
        return new domain_1.Agent(agentJson.id, agentJson.location, agentJson.platform);
    }
    async createAgent(location, platform) {
        logger_1.logger.info('Creating agent on chain');
        const agentId = uuid_1.v4();
        const agent = new domain_1.Agent(agentId, location, platform);
        try {
            const agentResource = this.generateNewAgentResource(agent);
            const agentRegistry = await this.getAgentRegistry();
            agentRegistry.add(agentResource);
            return agent;
        }
        catch (err) {
            logger_1.logger.error(`Error while submitting agent resource to registry: ${err}`);
            throw err;
        }
    }
    async getAgent(agentId) {
        try {
            const agentRegistry = await this.getAgentRegistry();
            const agentJson = JSON.parse(await agentRegistry.get(agentId));
            return AgentLedgerRepository_1.mapAgentJsonToAgentEntity(agentJson);
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agent with id ${agentId} : ${err}`);
            throw err;
        }
    }
    async getAllAgents() {
        try {
            const agentRegistry = await this.getAgentRegistry();
            const agents = JSON.parse(await agentRegistry.getAll());
            return agents.map((agent) => AgentLedgerRepository_1.mapAgentJsonToAgentEntity(agent));
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agents : ${err}`);
            throw err;
        }
    }
    async getAgentRegistry() {
        let agentRegistry;
        try {
            agentRegistry = await this.client.getParticipantRegistry(ResourceTypes_1.ResourceTypes.Agent.toString());
            return agentRegistry;
        }
        catch (err) {
            logger_1.logger.error(`Error while getting agent registry : ${err}`);
            throw err;
        }
    }
    async generateNewAgentResource(agent) {
        try {
            const agentResource = await this.client.createParticipantResource(ResourceTypes_1.ResourceTypes.Agent, agent.getAgentId().value);
            agentResource.setPropertyValue(this.LOCATION, agent.getLocation());
            agentResource.setPropertyValue(this.PLATFORM, agent.getPlatform());
            return agentResource;
        }
        catch (err) {
            logger_1.logger.error(`Error while fetching agent resource template : ${err}`);
            throw err;
        }
    }
};
AgentLedgerRepository = AgentLedgerRepository_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ILedgerClient)),
    __metadata("design:paramtypes", [provider_1.HLFClient])
], AgentLedgerRepository);
exports.AgentLedgerRepository = AgentLedgerRepository;
//# sourceMappingURL=AgentLedgerRepository.js.map