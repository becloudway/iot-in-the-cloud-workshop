const AWS = require('aws-sdk');

// The endpount can be found in the AWS IoT Core Console under settings
const iotdata = new AWS.IotData({endpoint: 'xxxxxxxxxxxxxx-ats.iot.eu-west-1.amazonaws.com'});

exports.handler = async (event) => {
    
    const params = {
        topic: 'iot/team_name/note',
        payload: event.note,
        qos: 0
    };

    let response = {
        statusCode: 200,
        body: "empty"
    };
    
    try {
       let result = await new Promise((resolve, reject) => {
            iotdata.publish(params, (err, data) => {
                if(err)
                    reject(err);
                else
                    resolve(data);
            });
        });


        response = {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (ex) {
        response = {
            statusCode: 500,
            body: JSON.stringify(ex)
        };
    }

    return response;
};
