"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractAnomalyReport {
    constructor(id, assetType, creationTime, previousAnomalyReportId, relatedAssedId) {
        this.id = id;
        this.assetType = assetType;
        this.creationTime = creationTime;
        this.previousAnomalyReportId = previousAnomalyReportId;
        this.relatedAssetId = relatedAssedId;
    }
    getId() {
        return this.id;
    }
    getAssetType() {
        return this.assetType;
    }
    getCreationTime() {
        return this.creationTime;
    }
    getRelatedAssetId() {
        return this.relatedAssetId;
    }
    getPreviousAnomalyReportId() {
        return this.previousAnomalyReportId;
    }
}
exports.AbstractAnomalyReport = AbstractAnomalyReport;
//# sourceMappingURL=AbstractAnomalyReport.js.map