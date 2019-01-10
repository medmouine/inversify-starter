"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@/logger");
const composer_client_1 = require("composer-client");
const config = require("config");
class HLFConnection {
    static getConnection(result) {
        if (this.isConnected) {
            result(this.businessNetworkConnection);
        }
        else {
            this.connect().then((connection) => {
                result(connection);
            });
        }
    }
    static async connect() {
        try {
            this.businessNetworkConnection = new composer_client_1.BusinessNetworkConnection();
            logger_1.logger.info(`Connecting to chain with card : ${HLFConnection.CARD_NAME}`);
            await this.businessNetworkConnection.connect(HLFConnection.CARD_NAME);
            this.isConnected = true;
            logger_1.logger.info(`Connection success !`);
            return this.businessNetworkConnection;
        }
        catch (error) {
            logger_1.logger.error(`Could not connect to Hyperledger network : ${error}`);
            process.exit();
        }
    }
}
HLFConnection.CARD_NAME = config.get('HLF.cardName');
HLFConnection.isConnected = false;
exports.HLFConnection = HLFConnection;
//# sourceMappingURL=HLFConnection.js.map