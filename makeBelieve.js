
(function (globalObj) {
    // Setup MakeBelieveJS

    // MakeBelieveElement constructor function
    function MakeBelieveElement(nodes) {
        // This means this instance of MakeBelieveElement
        this.nodes = nodes;
        var i = 0;

        if (nodes && nodes.length) {
            nodes.forEach(nodes => {
                this[i] = nodes;
                i += 1;
            });
        }
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

    // 4. Find parent method
    MakeBelieveElement.prototype.parent = function (cssSelector = "") {
        if (cssSelector !== "") {
            var validParentNodes = document.querySelectorAll(cssSelector);
        }

        parents = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];
            var currentParent = currentElement.parentNode;

            if (!parents.includes(currentParent)) {
                if (cssSelector !== "") {
                    if (validParentNodes.length > 0) {
                        for (var i = 0; i < validParentNodes.length; i++) {
                            if (validParentNodes[i] === currentParent) {
                                parents.push(currentParent);
                            }
                        }
                    }
                } else {
                    parents.push(currentParent);
                }
            }
        }
        return new MakeBelieveElement(parents);
    }

    // 5. grandParent method
    MakeBelieveElement.prototype.grandParent = function (cssSelector = "") {
        return this.parent().parent(cssSelector);
    }

    // 6. Ancestor
    MakeBelieveElement.prototype.ancestor = function (cssSelector = "") {
        if (cssSelector !== "") {
            var validAncestorNodes = document.querySelectorAll(cssSelector);
        }

        grandparents = this.grandParent();
        ancestor = "";

        for (var i = 0; i < grandparents.getLength(); i++) {
            var currentGrandparent = grandparents[i];
            if (cssSelector !== "") {
                var currentAncestor = currentGrandparent.parentNode;
                for (var i = 0; i < validAncestorNodes.length; i++) {
                    while (currentAncestor) {
                        if (currentAncestor === validAncestorNodes[i]) {
                            return new MakeBelieveElement(currentAncestor);
                        } else {
                            currentAncestor = currentAncestor.parentNode;
                        }
                    }
                }
            } else {
                ancestor = grandparents[i].parentNode;
                return new MakeBelieveElement(ancestor);
            }
        }
        return new MakeBelieveElement();
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

// // testing parent
// var paragraphs = __('p');
// var divs = __('.item');
// var parent = __('#password').parent();
// var formParent = __('#password').parent('form');

// console.log(paragraphs.parent());
// console.log(paragraphs.parent('#paragraph_parent'));
// console.log(divs.parent());

// // testing grandParent
// var grandParent = __('#password').grandParent();
// var idGrandParent = __('#password').grandParent('#grandma');
// var emptyGrandParent = __('#password').grandParent('#unknownId');

// console.log(grandParent); // returns the div with id #grandma
// console.log(idGrandParent); // returns same div
// console.log(emptyGrandParent); // reutrns an empty object

// testing ancestor
var ancestor1 = __('#password').ancestor();
var ancestor2 = __('#password').ancestor('.ancestor');
var rootElem = __('#password').ancestor('.root');
var ancestorSib = __('#password').ancestor('.ancestor-sib');

console.log(ancestor1); // Returns div with class .ancestor
console.log(ancestor2); // Returns div with class .ancestor
console.log(rootElem); // Returns div with class .root
console.log(ancestorSib); // Returns empty


// console.log(paragraphs.getLength());
// console.log(paragraphs.getTagNames());
// console.log(divs.getLength());
// console.log(divs.getTagNames());


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