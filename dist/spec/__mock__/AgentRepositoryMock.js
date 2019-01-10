"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class AgentRepositoryMock {
    constructor(throwError = false) {
        this.throwError = throwError;
    }
    async createAgent(location, platform) {
        if (this.throwError) {
            throw AgentRepositoryMock.CREATION_ERROR;
        }
        return AgentRepositoryMock.AGENT;
    }
    async getAgent(agentId) {
        if (this.throwError) {
            throw AgentRepositoryMock.GET_ERROR;
        }
        return AgentRepositoryMock.AGENT;
    }
    async getAllAgents() {
        if (this.throwError) {
            throw AgentRepositoryMock.GET_ERROR;
        }
        return AgentRepositoryMock.AGENTS_LIST;
    }
}
AgentRepositoryMock.AGENT_ID = 'agentId';
AgentRepositoryMock.LOCATION = 'location';
AgentRepositoryMock.PLATFORM = 'platform';
AgentRepositoryMock.CREATION_ERROR = new Error('Error while creating agent');
AgentRepositoryMock.GET_ERROR = new Error('Error while getting agent');
AgentRepositoryMock.AGENT = new domain_1.Agent(AgentRepositoryMock.AGENT_ID, AgentRepositoryMock.LOCATION, AgentRepositoryMock.PLATFORM);
AgentRepositoryMock.AGENTS_LIST = [AgentRepositoryMock.AGENT];
exports.AgentRepositoryMock = AgentRepositoryMock;
//# sourceMappingURL=AgentRepositoryMock.js.map