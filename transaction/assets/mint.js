const keys = require("../../utilities/keys");
const broadcast = require("../../utilities/broadcastTx");
const config = require("../../config.json")
var request = require('request');

function mint(mnemonic, toID, fromID, classificationID, feesAmount, feesToken, gas, mode, memo = "") {
    const wallet = keys.getWallet(mnemonic);

    var options = {
        'method': 'POST',
        'url': config.lcdURL + config.mintTyp,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"type":"/xprt/assets/mint/request","value":{"baseReq":{"from":config.testAccountAddress,"chain_id":config.chain_id},"toID":toID,"fromID":fromID,"classificationID":classificationID,"mutableProperties":"Popularity:S|Very","immutableProperties":"Des:S|Hot Water","mutableMetaProperties":"CustSatisfaction:S|,burn:H|1","immutableMetaProperties":"Name:S|Geyser"}})
    };
    return new Promise(function(resolve, reject) {
        request(options, function (error, response) {
            if (error) throw new Error(error);

            var result = JSON.parse(response.body)

            let tx = {
                msg: result.value.msg,
                fee: {amount: [{amount: String(feesAmount), denom: feesToken}], gas: String(gas)},
                signatures:null,
                memo:""
            }
            resolve(broadcast.broadcastTx(wallet, tx, mode));
        });
    });
}

module.exports = {
    mint
};
