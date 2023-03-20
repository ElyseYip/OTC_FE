export const apis = {
    "createOTCDirectOrder": {
        name: "Create OTC Direct Order",
        method: "POST",
        url: "/web/api/v2/otc/create",
        reqData:["trader","baseAsset","quoteAsset","baseAmount","quoteAmount","side","expire"]

    },
    "takeOTCOrder": {
        name: "Take OTC Order",
        method: "POST",
        url: "/web/api/v2/otc/take",
        reqData:["orderId","code","amount"]
    },
    "openOffers":{
        name:"Open Offers",
        method:"GET",
        url: "/web/api/v2/otc/open",
        // reqParam:["date"]
    },
    "otcHistory": {
        name:"OTC History",
        method:"GET",
        url: "/web/api/v2/otc/history",
        // reqParam:["date"]
    },
    "validateMatchOrder":{
        name:"Match Validate",
        method:"POST",
        url:"/web/api/v2/otc/match/validate",
        reqData:["askTrader","askBaseAmount", "askQuoteAmount","bidTrader","bidBaseAmount","bidQuoteAmount","baseAsset","quoteAsset","expire"]
    },
    "createMatchOrder":{
        name:"Agent Create Order",
        method:"POST",
        url:"/web/api/v2/otc/agent/create",
        reqData:["askTrader","askBaseAmount", "askQuoteAmount","bidTrader","bidBaseAmount","bidQuoteAmount","baseAsset","quoteAsset","expire"]
    },
    "cancelOrder":{
        name:"Cancel Order",
        method:"DELETE",
        url:"/web/api/v2/otc/cancel",
        reqData:["orderId"]

    },
    "takeOrder":{
        name:"Take Order",
        method:"POST",
        url:"/web/api/v2/otc/take",
        reqData:["orderId", "code", "amount"]
    }


}
