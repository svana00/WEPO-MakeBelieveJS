
(function (globalObj) {
    // Setup MakeBelieveJS

    // MakeBelieveElement constructor function
    function MakeBelieveElement(nodes) {
        // This means this instance of MakeBelieveElement
        this.nodes = nodes;
    }

    MakeBelieveElement.prototype.getLength = function () {
        return this.nodes.length;
    };

    MakeBelieveElement.prototype.getTagNames = function () {
        var tagNames = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            tagNames.push(currentElement.tagName.toLowerCase());
        }
        return tagNames;
    }

    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    globalObj.__ = query;
})(window);

var paragraphs = __('p');
var divs = __('.item');
console.log(paragraphs.getLength());
console.log(paragraphs.getTagNames());
console.log(divs.getLength());
console.log(divs.getTagNames());


// var herokuUrl = 'https://serene-island-81305.herokuapp.com';

// // GET request
// var basicRequest = new XMLHttpRequest();
// basicRequest.open('GET', herokuUrl);

// basicRequest.onreadystatechange = function () {
//     if (basicRequest.readyState === XMLHttpRequest.DONE) {
//         console.log(basicRequest.responseText);
//     }
//     console.log(basicRequest.readyState);
// };

// basicRequest.send();

// // POST request
// var postRequest = new XMLHttpRequest();
// postRequest.open('POST', herokuUrl + '/api/200');

// postRequest.setRequestHeader('Content-Type', 'application/json');

// postRequest.onreadystatechange = function () {
//     if (postRequest.readyState === XMLHttpRequest.DONE) {
//         console.log(JSON.parse(postRequest.responseText));
//     }
//     console.log(postRequest.readyState);
// };

// postRequest.send(JSON.stringify({ a: 1, b: 2, c: 3 }));
