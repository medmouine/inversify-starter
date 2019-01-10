"use strict";
/* tslint:disable:no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("@/routes/participants/machine/agent");
const HttpStatus_1 = require("@/routes/HttpStatus");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const sinon_express_mock_1 = require("sinon-express-mock");
const AgentServiceMock_1 = require("../../__mock__/AgentServiceMock");
describe('AGENT route create AGENT', () => {
    let agentRoute;
    let validReq;
    let req;
    let res;
    let next;
    beforeEach(() => {
        validReq = {
            body: {
                location: 'location',
                platform: 'platform',
            }
        };
        req = sinon_express_mock_1.mockReq(validReq);
        res = sinon_express_mock_1.mockRes();
        next = sinon_1.stub();
    });
    it('Should return created', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock();
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.createAgent(req, res, next);
        chai_1.expect(res.set.calledOnceWith('location', AgentServiceMock_1.AgentServiceMock.AGENT_ID)).to.be.true;
        chai_1.expect(res.sendStatus.calledOnceWith(HttpStatus_1.HttpStatus.CREATED)).to.be.true;
    });
    it('Should catch error and forward it when creating agent', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock(true);
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.createAgent(req, res, next);
        chai_1.expect(res.set.called).to.be.false;
        chai_1.expect(res.sendStatus.calledOnceWith(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)).to.be.true;
        chai_1.expect(next.calledOnceWith(AgentServiceMock_1.AgentServiceMock.CREATION_ERROR)).to.be.true;
    });
});
describe('AGENT route get AGENT', () => {
    let agentRoute;
    let validReq;
    let req;
    let res;
    let next;
    beforeEach(() => {
        validReq = {
            body: {
                location: 'location',
                platform: 'platform',
            }
        };
        req = sinon_express_mock_1.mockReq(validReq);
        res = sinon_express_mock_1.mockRes();
        next = sinon_1.stub();
    });
    it('given existing agent id should return agent', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock();
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.getAgent(req, res, next);
        chai_1.expect(res.send.calledOnceWith(AgentServiceMock_1.AgentServiceMock.AGENT)).to.be.true;
    });
    it('should return all agents', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock();
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.getAllAgents(req, res, next);
        chai_1.expect(res.send.calledOnceWith(AgentServiceMock_1.AgentServiceMock.AGENTS_LIST)).to.be.true;
    });
    it('Should catch error and forward it when getting agent', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock(true);
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.getAgent(req, res, next);
        chai_1.expect(res.sendStatus.calledOnceWith(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)).to.be.true;
        chai_1.expect(next.calledOnceWith(AgentServiceMock_1.AgentServiceMock.GET_ERROR)).to.be.true;
    });
    it('given Non existant agent id when getting agent then Not found', async () => {
        const agentService = new AgentServiceMock_1.AgentServiceMock(false, false, true);
        agentRoute = new agent_1.AgentRoute(agentService);
        await agentRoute.getAgent(req, res, next);
        chai_1.expect(res.sendStatus.calledOnceWith(HttpStatus_1.HttpStatus.NOT_FOUND)).to.be.true;
        chai_1.expect(next.calledOnceWith(res)).to.be.true;
    });
});
//# sourceMappingURL=AgentRoute.spec.js.map