"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor(logId, creationTime, lastUpdate, lastCertifiedLine, exists, readable, location, hashValue, agentId) {
        this.logId = logId;
        this.creationTime = creationTime;
        this.lastUpdate = lastUpdate;
        this.lastCertifiedLine = lastCertifiedLine;
        this.exists = exists;
        this.readable = readable;
        this.location = location;
        this.hashValue = hashValue;
        this.agentId = agentId;
    }
    getAgentId() {
        return this.agentId;
    }
    getId() {
        return this.logId;
    }
    getCreatingTime() {
        return this.creationTime;
    }
    getLastUpdate() {
        return this.lastUpdate;
    }
    getLastCertifiedLine() {
        return this.lastCertifiedLine;
    }
    isExisting() {
        return this.exists;
    }
    isReadable() {
        return this.readable;
    }
    getLocation() {
        return this.location;
    }
    getHashValue() {
        return this.hashValue;
    }
}
exports.Log = Log;
//# sourceMappingURL=Log.js.map