"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class LogAssembler {
    constructor(client) {
        this.client = client;
    }
    async toAsset(entity) {
        const logResource = await this.client.getAssetResource(domain_1.ResourceType.LOG, entity.getId().getStringValue());
        logResource.setPropertyValue(LogAssembler.CREATION_TIME, entity.getCreatingTime());
        logResource.setPropertyValue(LogAssembler.LAST_UPDATE, entity.getLastUpdate());
        logResource.setPropertyValue(LogAssembler.LAST_CERTIFIED_LINE, entity.getLastCertifiedLine());
        logResource.setPropertyValue(LogAssembler.EXISTS, entity.isExisting());
        logResource.setPropertyValue(LogAssembler.READABLE, entity.isReadable());
        logResource.setPropertyValue(LogAssembler.LOCATION, entity.getLocation());
        logResource.setPropertyValue(LogAssembler.HASH_VALUE, entity.getHashValue());
        logResource.setPropertyValue(LogAssembler.AGENT_ID, entity.getAgentId().getStringValue());
        return logResource;
    }
    toEntity(asset) {
        return new domain_1.Log(new domain_1.LogId(asset.id), asset.creationTime, asset.lastUpdate, asset.lastCertifiedLine, asset.exists, asset.readable, asset.location, asset.hashValue, new domain_1.AgentId(asset.agentId));
    }
}
exports.LogAssembler = LogAssembler;
//# sourceMappingURL=LogAssembler.js.map