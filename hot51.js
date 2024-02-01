
const axios = require('axios');
const dLib = require('./decrypt');
async function getRoomIndex() {

    let data = 'pageNum=1&pageSize=10000';
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.t3cdn.com/501/api/live-service/h5/v3/public/live/room-index',
        headers: {
            'merchantid': '501',
            'locale-language': 'IND',
            'device': '9189d970-261e-4066-b919-63ae4cbc74ad',
            'dev-type': 'iOS_ iPhone 15 Pro Max',
            'system-version': '1.5.1',
            'versioncode': '101',
            'authorization': 'Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=',
            'area': 'ID',
            'origin': 'https://bling2.tv',
            'Content-Type': 'text/plain'
        },
        data: data
    };

    const response = await axios.request(config);
    const resData = response.data;
    const records = resData.records;
    const filterRecords = records.filter((w) => w.payType === 2);
    return filterRecords;
}

async function getRoomInfo(anchorId) {
    const axios = require('axios');
    let data = JSON.stringify({
        "anchorId": anchorId,
        "spH5": 1
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fzo.clowcdn.com/501/api/live-service/v3/public/live/room-info',
        headers: {
            'Host': 'fzo.clowcdn.com',
            'username': 'a3hhsfd267',
            'user-agent': 'y501/3.0.90 (iPhone; iOS 17.2.1; Scale/3.00)',
            'time-zone': 'GMT+07',
            'memberid': '1720384659381276674',
            'system-version': '17.2.1',
            'versioncode': '231',
            'sign': '01dfef11007180f20a912d481e5dd90f',
            'merchantid': '501',
            'authorization': 'Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=',
            'client-type': '1',
            'accept-language': 'en-US;q=1, id-US;q=0.9, ar-US;q=0.8',
            'ac': '2345689',
            'area': 'ID',
            'locale-language': 'ENU',
            'membertype': '1',
            'accept': '*/*',
            'content-type': 'application/json',
            'device': '6ED68741-0E21-4059-8652-95005B28485D',
            'wi': 'y09iXSpBXQIHC/eOpVd24w==',
            'dev-type': 'H5',
            'Cookie': '__cf_bm=CHDcvHtev.O1il2sCw_WcaMMtkTTpa7y4zFVRgkSUoY-1706827623-1-AQqa+yUCj48P/bTcvKm36D3VE6NU8ANlLppsaG9zyByQw4RztwjyIrYKd+HVIOxJBSoapd/KvJ2IMH7xliQ37xc=; _cfuvid=poVdabxdu_WqyvGM6Dn6LVL8XjziszlEu0LKytWQc1Q-1706827623014-0-604800000'
        },
        data: data
    };

    const response = await axios.request(config);
  const resdata = response.data.data;

    const result = {
        anchorNickName: resdata["anchorNickName"],
        pullAddressSmooth: dLib.decrypt(resdata["pullAddressSmooth"]),
        pullAddressStandardDefinition: dLib.decrypt(
            resdata["pullAddressStandardDefinition"]
        ),
        pullAddressHighDefinition: dLib.decrypt(resdata["pullAddressHighDefinition"]),
        pullLCAddress: dLib.decrypt(resdata["pullLCAddress"]),
        webSocketUrl: dLib.decrypt(resdata["webSocketUrl"], "common"),
        secret: resdata["secret"],
        liveArea: resdata["liveArea"],
        coverUrl: resdata["coverUrl"],
        watchUserCounts: resdata["watchUserCounts"],
        liveName: resdata["liveName"],
        anchorId,
        anchorMerchant: resdata["anchorMerchant"],
        isPk: resdata["isPk"],
    };

    return result;

}


module.exports.main = async () => {
    const roomIndex = await getRoomIndex();
    let result = []
    for (let r of roomIndex) {
        const roomInfoRequest = await getRoomInfo(r.anchorId);
        // console.log(roomInfoRequest)
        result.push(roomInfoRequest)

    }
    // return await getRoomIndex();
    return result;
}

