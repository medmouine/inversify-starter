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
Object.defineProperty(exports, "__esModule", { value: true });
var HLFAssetClient_1;
const HLFConnection_1 = require("@/Repository/provider/HLFConnection");
const inversify_1 = require("inversify");
let HLFAssetClient = HLFAssetClient_1 = class HLFAssetClient {
    constructor() {
        HLFConnection_1.HLFConnection.getConnection((connection) => {
            this.businessNetworkConnection = connection;
            this.factory = this.businessNetworkConnection.getBusinessNetwork().getFactory();
        });
    }
    async getAssetRegistry(participantType) {
        return await this.businessNetworkConnection.getAssetRegistry(`${HLFAssetClient_1.ASSET_NS}.${participantType.toString()}`);
    }
    async getAssetResource(resourceType, resourceId) {
        return this.factory.newResource(HLFAssetClient_1.ASSET_NS, resourceType, resourceId);
    }
};
HLFAssetClient.ASSET_NS = 'qostodian.assets';
HLFAssetClient = HLFAssetClient_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HLFAssetClient);
exports.HLFAssetClient = HLFAssetClient;
//# sourceMappingURL=HLFAssetClient.js.map