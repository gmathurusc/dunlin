const https = require('https');
const querystring = require('querystring');


exports.handler =  (event, context, callback) => {
    let requestBody = event.body;
    console.log("From API GATEWAY EVENT", event);
    console.log("From API GATEWAY EVNET BODY", event.body);
    return new Promise((resolve, reject) => {
        const createOrderOptions = {
            host: '3nfkged9ia.execute-api.us-west-2.amazonaws.com',
            path: '/Dev/order/createorder',
            port: 443,
            method: 'POST'
        };

        const req = https.request(createOrderOptions, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log("chunk 1", JSON.parse(chunk));
                const json  = JSON.parse(chunk);
                const orderId = json['orderId'];
                console.log("createOrderOptions orderId", orderId);
                const getPendingFullfillment = pendingFullfillment(orderId, requestBody);


            });
            res.on('end', () => {
            });
        });

        // send the request
        req.write('');
        req.end();
    });

    function pendingFullfillment(orderId, requestBody) {
        return new Promise((resolve, reject) => {
            const pendingFullfillmentOptions = {
                host: '3nfkged9ia.execute-api.us-west-2.amazonaws.com',
                path: '/Dev/order/pending-fulfillment?orderId='+orderId,
                port: 443,
                method: 'GET'
            };


            const req = https.request(pendingFullfillmentOptions, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log("pendingFullfillmentOptions chunk", JSON.parse(chunk));
                    const json  = JSON.parse(chunk);
                    const getDunsCreation = dunsCreation(orderId, requestBody);

                });
                res.on('end', () => {
                    console.log("005", 'end');
                    // resolve(res);
                });
            });

            console.log("006");
            // send the request
            req.write('');
            req.end();
        });
    }

    function dunsCreation(orderId, requestBody) {
        return new Promise((resolve, reject) => {
            console.log("In dunsCreation : ", requestBody);
            requestBody = JSON.parse(requestBody);
            const params = JSON.stringify({
                requestorKey: { name: 'orderID', value: orderId },
                super_seven:
                    { 'Company name': requestBody.company_name,
                        'Company Address': requestBody.company_address,
                        'Contact name': requestBody.contact_name,
                        'Contact Person\'s Designation': requestBody.contact_designation,
                        'Contact Number': requestBody.contact_number,
                        'Contact Email Address': requestBody.contact_email,
                        'Employee Size': requestBody.employee_size
                    }
            });

            const dunsCreationOptions = {
                "method": "POST",
                "hostname": "4scun8jkdl.execute-api.us-west-2.amazonaws.com",
                "port": 443,
                "path": "/Dev/duns/register",
                "headers": {
                    "content-type": "application/json",
                }
            };


            const req = https.request(dunsCreationOptions, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log("chunk", chunk);
                    var response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value",
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": chunk,
                        "isBase64Encoded": false
                    };
                    callback(null, response);

                });
                res.on('end', () => {
                    //   resolve(res);
                });
            });

            console.log("004");
            // send the request
            console.log("hfsfskfbkfs", orderId);
            req.write(params);
            req.end();
        });
    }
};
