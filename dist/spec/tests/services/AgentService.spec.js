"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/services");
const AgentRepositoryMock_1 = require("../../__mock__/AgentRepositoryMock");
describe('AGENT Service Test', () => {
    let agentService;
    it('Should return created agent', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock();
        agentService = new services_1.AgentService(agentRepository);
        const expected = await agentService.createAgent(AgentRepositoryMock_1.AgentRepositoryMock.LOCATION, AgentRepositoryMock_1.AgentRepositoryMock.PLATFORM);
        expect(expected).toBe(AgentRepositoryMock_1.AgentRepositoryMock.AGENT);
    });
    it('Should create agent when asked', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock();
        const spy = jest.spyOn(agentRepository, 'createAgent');
        agentService = new services_1.AgentService(agentRepository);
        const expected = await agentService.createAgent(AgentRepositoryMock_1.AgentRepositoryMock.LOCATION, AgentRepositoryMock_1.AgentRepositoryMock.PLATFORM);
        expect(spy).toHaveBeenCalledWith(AgentRepositoryMock_1.AgentRepositoryMock.LOCATION, AgentRepositoryMock_1.AgentRepositoryMock.PLATFORM);
    });
    it('Should forward error', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock(true);
        agentService = new services_1.AgentService(agentRepository);
        let expectedError;
        try {
            await agentService.createAgent(AgentRepositoryMock_1.AgentRepositoryMock.LOCATION, AgentRepositoryMock_1.AgentRepositoryMock.PLATFORM);
        }
        catch (e) {
            expectedError = e;
        }
        expect(expectedError).toBe(AgentRepositoryMock_1.AgentRepositoryMock.CREATION_ERROR);
    });
    it('Should return created agent when asked to get agent by id', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock();
        agentService = new services_1.AgentService(agentRepository);
        const expected = await agentService.getAgent(AgentRepositoryMock_1.AgentRepositoryMock.AGENT_ID);
        expect(expected).toBe(AgentRepositoryMock_1.AgentRepositoryMock.AGENT);
    });
    it('Should forward error', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock(true);
        agentService = new services_1.AgentService(agentRepository);
        let expectedError;
        try {
            await agentService.getAgent(AgentRepositoryMock_1.AgentRepositoryMock.AGENT_ID);
        }
        catch (e) {
            expectedError = e;
        }
        expect(expectedError).toBe(AgentRepositoryMock_1.AgentRepositoryMock.GET_ERROR);
    });
    it('Should return agents list when asked to get all agents', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock();
        agentService = new services_1.AgentService(agentRepository);
        const expected = await agentService.getAllAgents();
        expect(expected).toBe(AgentRepositoryMock_1.AgentRepositoryMock.AGENTS_LIST);
    });
    it('Should forward error', async () => {
        const agentRepository = new AgentRepositoryMock_1.AgentRepositoryMock(true);
        agentService = new services_1.AgentService(agentRepository);
        let expectedError;
        try {
            await agentService.getAllAgents();
        }
        catch (e) {
            expectedError = e;
        }
        expect(expectedError).toBe(AgentRepositoryMock_1.AgentRepositoryMock.GET_ERROR);
    });
});
//# sourceMappingURL=AgentService.spec.js.map