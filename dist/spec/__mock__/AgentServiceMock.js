"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
const services_1 = require("@/services");
class AgentServiceMock extends services_1.AgentService {
    constructor(throwError = false, returnEmptyAgentList = false, returnNullAgent = false) {
        super(undefined);
        this.throwError = throwError;
        this.returnEmptyAgentList = returnEmptyAgentList;
        this.returnNullAgent = returnNullAgent;
    }
    async createAgent(location, platform) {
        if (this.throwError) {
            throw AgentServiceMock.CREATION_ERROR;
        }
        return new domain_1.Agent(AgentServiceMock.AGENT_ID, AgentServiceMock.LOCATION, AgentServiceMock.PLATFORM);
    }
    async getAgent(agentId, returnNull = false) {
        if (this.throwError) {
            throw AgentServiceMock.GET_ERROR;
        }
        if (this.returnNullAgent) {
            return undefined;
        }
        return AgentServiceMock.AGENT;
    }
    async getAllAgents() {
        if (this.throwError) {
            throw AgentServiceMock.GET_ERROR;
        }
        if (this.returnEmptyAgentList) {
            return [];
        }
        return AgentServiceMock.AGENTS_LIST;
    }
}
AgentServiceMock.AGENT_ID = 'agentId';
AgentServiceMock.LOCATION = 'location';
AgentServiceMock.PLATFORM = 'platform';
AgentServiceMock.CREATION_ERROR = new Error('Error while creating agent');
AgentServiceMock.GET_ERROR = new Error('Error while getting agent');
AgentServiceMock.AGENT = new domain_1.Agent(AgentServiceMock.AGENT_ID, AgentServiceMock.LOCATION, AgentServiceMock.PLATFORM);
AgentServiceMock.AGENTS_LIST = [AgentServiceMock.AGENT];
exports.AgentServiceMock = AgentServiceMock;
//# sourceMappingURL=AgentServiceMock.js.map