"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class AgentAssembler {
    constructor(client) {
        this.client = client;
    }
    async toAsset(entity) {
        const agentResource = await this.client.getParticipantResource(domain_1.ResourceType.AGENT, entity.getAgentId().getStringValue());
        agentResource.setPropertyValue(AgentAssembler.LOCATION, entity.getLocation());
        agentResource.setPropertyValue(AgentAssembler.PLATFORM, entity.getPlatform());
        return agentResource;
    }
    toEntity(asset) {
        return new domain_1.Agent(new domain_1.AgentId(asset.id), asset.location, asset.platform);
    }
}
exports.AgentAssembler = AgentAssembler;
//# sourceMappingURL=AgentAssembler.js.map