const keys = require("./utilities/keys");
const bank = require("./transaction/bank/index");
const identity = require("./transaction/identity/index");
const accounts = require("./transaction/accounts/index");
const cls = require("./transaction/classification/index");
const assets = require("./transaction/assets/index");
const meta = require("./transaction/meta/index");
const splits = require("./transaction/splits/index");
const orders = require("./transaction/orders/index");
const config = require("./config.json");

let mnemonic = "wage thunder live sense resemble foil apple course spin horse glass mansion midnight laundry acoustic rhythm loan scale talent push green direct brick please";
let toAddress = "cosmos1pkkayn066msg6kn33wnl5srhdt3tnu2vzasz9c";

async function test(){
    console.log("Creating random wallet...");
    let randomWallet = keys.createRandomWallet();
    console.log(randomWallet);

    let userGivenMnemonic = 'banana sun alone body hybrid praise drift gravity castle task proud six surround twice fuel riot enable deny casual menu elbow beauty repair three';
    console.log("Creating wallet from mnemonic...");
    let wallet = keys.createWallet(userGivenMnemonic);
    console.log(wallet);

    console.log("Creating keystore...");

    let createdStore = keys.createStore(wallet.mnemonic, "123123123", wallet.address);
    if (createdStore.error) {
        console.log(createdStore.error);
    } else {
        console.log("Keystore created with name " + wallet.address + ".json")
    }

    if (createdStore.error) {
        console.log("Unable to store keys. Reason: " + created.error);
    }

    console.log("Reading keystore...");
    let mnemonicRestored = keys.decryptStore("cosmos160phc9aajqmllhn442tyehkrwpd8sytr6q9uwc.json", "123123123")
    console.log(mnemonicRestored);

    var result = await nub(mnemonic, toAddress,  25, "stake", 200000, "block")
    console.log("**TX HASH for nub**:" + result);

    if (result) {

        var res = await bank.sendCoin(mnemonic, wallet.address, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Send Coin **: " + res);

        var results = await identity.queryIdentity(config.nubID)
        var clsID = results.clasificationID + '|' + results.hashID

        res = await identity.define(mnemonic, clsID, "HolidaysTaken:S|", "BelongTo:S|Earth,Birthday:S|", "WorkingHours:S|", "Organization:S|Persistence,DateOfJoining:S|,Name:S|", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for define identity 1 **: " + res);

        results = await cls.queryCls("Organization")
        var classificationID = results.chainID + '.' + results.hashID

        res = await identity.issue(mnemonic, config.testAccountAddress, clsID, classificationID, "HolidaysTaken:S|4", "BelongTo:S|Earth,Birthday:S|22March1996", "WorkingHours:S|12to9", "Organization:S|Persistence,DateOfJoining:S|8July2018,Name:S|John", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for issue identity 1 **: " + res);

        res = await identity.define(mnemonic, clsID, "HolidaysTaken1:S|", "BelongTo1:S|Earth,Birthday:S|", "WorkingHours1:S|", "Organization1:S|Persistence,DateOfJoining:S|,Name:S|", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for define identity 2 **:" + res);

        results = await cls.queryCls("Organization1")
        var classificationID1 = results.chainID + '.' + results.hashID

        res = await identity.issue(mnemonic, config.testAccountAddress, clsID, classificationID1, "HolidaysTaken1:S|5", "BelongTo1:S|Earth,Birthday:S|24June1996", "WorkingHours1:S|10to7", "Organization1:S|Persistence,DateOfJoining:S|9July2018,Name:S|Samantha", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for issue identity 2 **:" + res);

        results = await identity.queryIdentity("Organization")
        var identityID1 = results.clasificationID + '|' + results.hashID

        results = await identity.queryIdentity("Organization1")
        var identityID2 = results.clasificationID + '|' + results.hashID

        res = await identity.provision(mnemonic, identityID1, wallet.address, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Provision **: " + res);

        res = await identity.unprovision(mnemonic, identityID1, wallet.address, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Unprovision **: " + res);

        res = await assets.define(mnemonic, identityID1, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for define assets**:"  + res);

        results = await cls.queryCls("Name")
        assetClsID = results.chainID + '.' + results.hashID

        res = await assets.mint(mnemonic, identityID1, identityID1, assetClsID, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for mint asset**: " + res);

        results = await assets.query("Name")
        var assetID = results.clasificationID + '|' + results.hashID

        res = await assets.mutate(mnemonic, identityID1, assetID, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for mutate asset**: " + res);

        // res = await meta.reveal(mnemonic, "H|1", 25, "stake", 200000, "block")
        // console.log("\n\n**TX HASH for meta reveal**:" + res);

        res = await splits.wrap(mnemonic, identityID1, "100000stake", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Wrap**: " + res);

        res = await splits.unwrap(mnemonic, identityID1, "stake", "100", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Unwrap**: " + res);

        res = await splits.send(mnemonic, identityID1, identityID2, "stake", "499", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Splits Send**:" + res);

        var mutableMetaTraits = "exchangeRate:D|0.000000000000000001,makerOwnableSplit:D|0.000000000000000001,expiry:H|1000000,takerID:I|ID,makerSplit:D|0.000000000000000001"
        res = await orders.define(mnemonic, identityID2, "descriptions:S|", "Which Gift:S|,What Gift:S|", mutableMetaTraits, "Gift:S|Exchange,AmazonOrderID:S|", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for define Order **: " + res);

        results = await cls.queryCls("Gift")
        var orderCls = results.chainID + '.' + results.hashID

        var mutableMetaProperties = "exchangeRate:D|0.000000000000000001,makerSplit:D|0.000000000000000001"
        res = await orders.make(mnemonic, identityID2, orderCls, "stake", config.makerownableid, "100000", "0.000000000000000001", "descriptions:S|awesomeChocolates", "Which Gift:S|Christmas Gift,What Gift:S|Chocolates", mutableMetaProperties, "Gift:S|Exchange,AmazonOrderID:S|1234", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Make Order **: " + res);

        results = await orders.query("Gift")
        var orderID = results.clasificationID + '*' + results.makerownableid + '*' + results.takerownableid + '*' + results.makerID + '*' + results.hashID

        res = await orders.cancel(mnemonic, identityID2, orderID, 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Cancel Order **: " + res);

        mutableMetaProperties = "exchangeRate:D|0.000000000000000001,makerSplit:D|0.000000000000000001"
        res = await orders.make(mnemonic, identityID2, orderCls, "stake", "stake", "100000", "0.000000000000000001", "descriptions:S|awesomeChocolates", "Which Gift:S|Christmas Gift,What Gift:S|Chocolates", mutableMetaProperties, "Gift:S|Exchange,AmazonOrderID:S|1234", 25, "stake", 200000, "block")
        console.log("\n\n**TX HASH for Make Order **: " + res);

        // res = await orders.take(mnemonic, identityID2, "0.000000000000000001", orderID, 25, "stake", 200000, "block")
        // console.log("\n\n**TX HASH for Take Order **: " + res);
        //
        // res = await assets.burn(mnemonic, identityID1, assetID, "25", "stake", "200000", "block", "")
        // console.log("\n\n**TX HASH for Asset Burn**: " + res);

    } else {
        console.log("ERROR!!");
        console.log("NUB Tx failed!!");
    }

}

test()

async function nub(mnemonic, toAddress, fee, token, gas, mode){
    return new Promise(async function(resolve, reject) {
        var result = await identity.nub(mnemonic, toAddress, fee, token, gas, mode)
        resolve(result)
    });
}



