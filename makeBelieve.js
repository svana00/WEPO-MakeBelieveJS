
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

    // 4. find parent method
    MakeBelieveElement.prototype.parent = function(cssSelector) {
        parent = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            parent.push(currentElement.parentNode);
        }
        return parent;
    }

    // 5. grandParent method
    MakeBelieveElement.prototype.grandParent = function(cssSelector) {
        parent = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            parent.push(currentElement.parentNode);
        }
        grandParent = parent[0].parentNode;
        return grandParent;
    }

    // 6. ancestor
    MakeBelieveElement.prototype.ancestor = function(cssSelector) {
        parent = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            parent.push(currentElement.parentNode);
        }
        grandParent = parent[0].parentNode;
        ancestor = grandParent.parentNode;
        return ancestor;
    }    

    //  query selector
    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    // 7.click handler

    // 8. insert text method

    // 9. append HTML method
    function appendHTML(someHTML) {
        const createEl = document.createElement('div');
        const innerhtml = createEl.innerHTML = someHTML;
        const parentEl = document.getElementById('body');
        parentEl.appendChild(createEl);

        return parentEl;
    }

    // 10. prepend HTML method
    function prependHTML(someHTML) {
        const parentEl = document.getElementById('body');
        const firstchildEl = document.getElementById('firstchild');
 
        const createEl = document.createElement('div');
        const innerhtml = createEl.innerHTML = 'i am a frontend developer';

        parentEl.insertBefore(createEl, firstchildEl);
        return parentEl;
    }

    // 11. delete method

    // 12. JQuery ajax method

    // 13. css() method

    // 14. toggleClass() implementation

    // 15. submit handler for forms

    // 16. input handler for input tags

    globalObj.__ = query;
})(window);

var paragraphs = __('p');
var divs = __('.item');
var parent = __('#password').parent();
var formParent = __('#password').parent('form');

var grandParent = __('#password').grandParent();
var idGrandParent = __('#password').grandParent('#grandma');
var emptyGrandParent = __('#password').grandParent('#unknownId');

var ancestor = __('#password').ancestor('.ancestor');
var rootElem = __('#password').ancestor('.root');
var ancestorSib = __('#password').ancestor('.ancestor-sib');



console.log(paragraphs.getLength());
console.log(paragraphs.getTagNames());
console.log(divs.getLength());
console.log(divs.getTagNames());

// testing parent
console.log(paragraphs.parent()); 
console.log(paragraphs.parent('#paragraph_parent')); 

// testing grandParent
console.log(grandParent); // returns the div with id #grandma
console.log(idGrandParent); // returns same div
console.log(emptyGrandParent); // reutrns an empty object

// testing ancestor
console.log(ancestor);
console.log(rootElem);
console.log(ancestorSib);




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