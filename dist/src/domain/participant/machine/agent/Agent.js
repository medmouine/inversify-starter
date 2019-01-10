"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Agent {
    constructor(agentId, location, platform) {
        this.platform = platform;
        this.location = location;
        this.agentId = agentId;
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