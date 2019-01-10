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
const Repository_1 = require("@/Repository");
const inversify_1 = require("inversify");
require("reflect-metadata");
let HLFParticipantClient = class HLFParticipantClient {
    constructor() {
        this.PARTICIPANTS_NS = 'qostodian.participants';
        Repository_1.HLFConnection.getConnection((connection) => {
            this.businessNetworkConnection = connection;
            this.factory = this.businessNetworkConnection.getBusinessNetwork().getFactory();
        });
    }
    async getParticipantRegistry(participantType) {
        return await this.businessNetworkConnection.getParticipantRegistry(`${this.PARTICIPANTS_NS}.${participantType.toString()}`);
    }
    async getParticipantResource(resourceType, resourceId) {
        return this.factory.newResource(this.PARTICIPANTS_NS, resourceType, resourceId);
    }
};
HLFParticipantClient = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HLFParticipantClient);
exports.HLFParticipantClient = HLFParticipantClient;
//# sourceMappingURL=HLFParticipantClient.js.map