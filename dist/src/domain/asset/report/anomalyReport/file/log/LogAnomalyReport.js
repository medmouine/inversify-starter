"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class LogAnomalyReport extends domain_1.AbstractAnomalyReport {
    constructor(id, creationTime, localHash, absoluteDiff, relativeDiff, previousAnomalyReportId, relatedAssetId) {
        super(id, domain_1.ResourceType.LOG, creationTime, previousAnomalyReportId, relatedAssetId);
        this.localHash = localHash;
        this.absoluteDiff = absoluteDiff;
        this.relativeDiff = relativeDiff;
    }
    getLocalHash() {
        return this.localHash;
    }
    getAbsoluteDiff() {
        return this.absoluteDiff;
    }
    getRelativeDiff() {
        return this.relativeDiff;
    }
}
exports.LogAnomalyReport = LogAnomalyReport;
//# sourceMappingURL=LogAnomalyReport.js.map