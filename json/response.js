module.exports = function response(code = 1, status = 200, details = null, message = "" , data = null) {

    const response={
        "statusCode":   "response status code",
        "code":     "code",
        "message":  "message",
        "data":{}
    };

    response.code = code;
    response.status = status;
    if (details) response.details = details;
    response.message = message;
    response.data = data;

    return response;
};