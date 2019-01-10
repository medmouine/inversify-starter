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
var _a;
const types_1 = require("@/constants/types");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const ANOMALY_REPORT_ROUTE_PATH = '/asset/anomalyReport';
let AnomalyReportRoute = class AnomalyReportRoute extends inversify_express_utils_1.BaseHttpController {
    constructor(anomalyReportService) {
        super();
        this.anomalyReportService = anomalyReportService;
    }
};
AnomalyReportRoute = __decorate([
    inversify_express_utils_1.controller(ANOMALY_REPORT_ROUTE_PATH),
    __param(0, inversify_1.inject(types_1.default.IAnomalyReportService)),
    __metadata("design:paramtypes", [typeof (_a = typeof IAnomalyReportService !== "undefined" && IAnomalyReportService) === "function" && _a || Object])
], AnomalyReportRoute);
exports.AnomalyReportRoute = AnomalyReportRoute;
//# sourceMappingURL=AnomalyReportRoute.js.map