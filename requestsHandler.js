var port = 8136;

// extract url parameters
function getJsonFromUrl(url) {
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

// Handle POST requests
async function postThis(dataToBePosted, model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    let responseData = {};
    var headers = { "Content-Type": "application/json" };
    await fetch(`http://localhost:${port}/api/${model}/${route}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(dataToBePosted)
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            if(data.token) token = data.token;
            responseData = data;
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "data": responseData };
}

// Handle GET requests
async function getThis(model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    let returnedData = {}
    var headers = {};
    await fetch(`http://localhost:${port}/api/${model}/${route}/`, {
        method: 'GET',
        headers,
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            returnedData = data
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "data": returnedData };
}

// Handle PUT requests
async function putThis(dataToBeUpdated, model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    let returnedData = {};
    await fetch(`http://localhost:${port}/api/${model}/${route}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBeUpdated)
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            returnedData = data;
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "data": returnedData };
}

// Handle DELETE requests
async function deleteThis(id, model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    await fetch(`http://localhost:${port}/api/${model}/${route}/${id}`, {
        method: 'DELETE',
        headers,
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            returnedData = data
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage };
}