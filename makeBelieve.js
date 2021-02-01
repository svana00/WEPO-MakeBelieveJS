var herokuUrl = 'https://serene-island-81305.herokuapp.com';

// GET request
var basicRequest = new XMLHttpRequest();
basicRequest.open('GET', herokuUrl);

basicRequest.onreadystatechange = function () {
    if (basicRequest.readyState === XMLHttpRequest.DONE) {
        console.log(basicRequest.responseText);
    }
    console.log(basicRequest.readyState);
};

basicRequest.send();

// POST request
var postRequest = new XMLHttpRequest();
postRequest.open('POST', herokuUrl + '/api/200');

postRequest.setRequestHeader('Content-Type', 'application/json');

postRequest.onreadystatechange = function () {
    if (postRequest.readyState === XMLHttpRequest.DONE) {
        console.log(JSON.parse(postRequest.responseText));
    }
    console.log(postRequest.readyState);
};

postRequest.send(JSON.stringify({ a: 1, b: 2, c: 3 }));
