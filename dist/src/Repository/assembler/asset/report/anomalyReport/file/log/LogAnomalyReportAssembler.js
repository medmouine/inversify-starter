"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("@/domain");
class LogAnomalyReportAssembler {
    constructor(client) {
        this.client = client;
    }
    async toAsset(entity) {
        const logAnomalyReportResource = await this.client.getAssetResource(domain_1.ResourceType.LOG_ANOMALY_REPORT, entity.getId().getStringValue());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.ASSET_TYPE, entity.getAssetType());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.CREATION_TIME, entity.getCreationTime());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.LOCAL_HASH, entity.getLocalHash());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.ABSOLUTE_DIFF, entity.getAbsoluteDiff());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.RELATIVE_DIFF, entity.getRelativeDiff());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.PREVIOUS_ANOMALY_REPORT_ID, entity.getRelativeDiff());
        logAnomalyReportResource.setPropertyValue(LogAnomalyReportAssembler.RELATED_ASSET_ID, entity.getRelatedAssetId());
        return logAnomalyReportResource;
    }
    toEntity(asset) {
        return new domain_1.LogAnomalyReport(new domain_1.ReportId(asset.id), new Date(asset.creationTime), asset.localHash, asset.absoluteDiff, asset.relativeDiff, new domain_1.ReportId(asset.previousAnomalyReportId), new domain_1.LogId(asset.relatedAssetId));
    }
}
LogAnomalyReportAssembler.ASSET_TYPE = 'assetType';
LogAnomalyReportAssembler.CREATION_TIME = 'creationTime';
LogAnomalyReportAssembler.LOCAL_HASH = 'localHash';
LogAnomalyReportAssembler.ABSOLUTE_DIFF = 'absoluteDiff';
LogAnomalyReportAssembler.RELATIVE_DIFF = 'relativeDiff';
LogAnomalyReportAssembler.PREVIOUS_ANOMALY_REPORT_ID = 'previousAnomalyReportId';
LogAnomalyReportAssembler.RELATED_ASSET_ID = 'relatedAssetId';
exports.LogAnomalyReportAssembler = LogAnomalyReportAssembler;
//# sourceMappingURL=LogAnomalyReportAssembler.js.map