"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class Agent {
    constructor(agentId, location, platform) {
        this.platform = platform;
        this.location = location;
        this.agentId = new domain_1.AgentId(agentId);
    }
    getAgentId() {
        return this.agentId;
    }
    getLocation() {
        return this.location;
    }
    getPlatform() {
        return this.platform;
    }
}
exports.Agent = Agent;
//# sourceMappingURL=Agent.js.map