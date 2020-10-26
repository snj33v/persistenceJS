const keys = require("../../utilities/keys");
const broadcast = require("../../utilities/broadcastTx");
const config = require("../../config.json")
const request = require('request');

function define(address, chain_id, mnemonic, classificationID, feesAmount, feesToken, gas, mode, memo = "") {
    const wallet = keys.getWallet(mnemonic);

    let options = {
        'method': 'POST',
        'url': config.lcdURL + config.defineAssetType,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": config.defineAssetType + "/request",
            "value": {
                "baseReq": {"from": address, "chain_id": chain_id, "memo": memo},
                "fromID": classificationID,
                "mutableTraits": "ASSET1:S|num1,burn:H|1",
                "immutableTraits": "ASSET2:S|",
                "mutableMetaTraits": "ASSET3:S|num3",
                "immutableMetaTraits": "ASSET4:S|num4"
            }
        })

    };
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) throw new Error(error);

            let result = JSON.parse(response.body)

            let tx = {
                msg: result.value.msg,
                fee: {amount: [{amount: String(feesAmount), denom: feesToken}], gas: String(gas)},
                signatures: null,
                memo: result.value.memo
            }
            resolve(broadcast.broadcastTx(wallet, tx, chain_id, mode));
        });
    });
}

module.exports = {
    define
};
