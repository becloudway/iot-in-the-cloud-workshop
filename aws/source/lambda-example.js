const AWS = require('aws-sdk');

// The endpount can be found in the AWS IoT Core Console under settings
const iotdata = new AWS.IotData({endpoint: 'xxxxxxxxxxx.iot.eu-west-1.amazonaws.com'});

exports.handler = async (event) => {
    
    const params = {
        topic: 'iot/demo/server/test',
        payload: 'Hello there',
        qos: 0
    };
    
    try {
        await new Promise((resolve, reject) => {
            iotdata.publish(params, (err, data) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    console.log("Success");
                    resolve(data);
                }
            });
        });
    } catch (ex) {
        console.log(ex);
    }
    
    const response = {
        statusCode: 200
    };
    
    return response;
};
