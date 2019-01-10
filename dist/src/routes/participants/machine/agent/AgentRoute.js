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
const routes_1 = require("@/routes");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const AGENT_ROUTE_PATH = '/participants/machines/agents';
let AgentRoute = class AgentRoute extends inversify_express_utils_1.BaseHttpController {
    constructor(agentService) {
        super();
        this.agentService = agentService;
    }
    async getAllAgents(req, res, forwardCallback) {
        try {
            const agents = await this.agentService.getAllAgents();
            res.send(agents);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async getAgent(agentId, res, forwardCallback) {
        try {
            const agent = await this.agentService.getAgent(new domain_1.AgentId(agentId));
            if (!agent) {
                logger_1.logger.error(`Cannot find agent with id : ${agentId}`);
                res.sendStatus(routes_1.HttpStatus.NOT_FOUND);
                forwardCallback(res);
            }
            res.send(agent);
            return res;
        }
        catch (err) {
            logger_1.logger.error(err);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
    async createAgent(agentReq, res, forwardCallback) {
        try {
            const agent = await this.agentService.createAgent(agentReq.location, agentReq.platform);
            res.set('location', `${AGENT_ROUTE_PATH}/${agent.getAgentId().getStringValue()}`);
            res.status(routes_1.HttpStatus.CREATED);
            res.send('AGENT created');
            return res;
        }
        catch (err) {
            logger_1.logger.error(`Error while creating agent : ${err}`);
            res.sendStatus(routes_1.HttpStatus.INTERNAL_SERVER_ERROR);
            forwardCallback(err);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AgentRoute.prototype, "getAllAgents", null);
__decorate([
    inversify_express_utils_1.httpGet('/:agentId'),
    __param(0, inversify_express_utils_1.requestParam('agentId')), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function]),
    __metadata("design:returntype", Promise)
], AgentRoute.prototype, "getAgent", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AgentRoute.prototype, "createAgent", null);
AgentRoute = __decorate([
    inversify_express_utils_1.controller(AGENT_ROUTE_PATH),
    __param(0, inversify_1.inject(types_1.default.IAgentService)),
    __metadata("design:paramtypes", [Object])
], AgentRoute);
exports.AgentRoute = AgentRoute;
//# sourceMappingURL=AgentRoute.js.map