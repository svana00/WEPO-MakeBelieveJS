
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

    // Query selector
    function query(cssSelector) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelector));
    }

    // 4. Find parent method
    MakeBelieveElement.prototype.parent = function (cssSelector = "") {
        // If selector, find all elements that are valid
        if (cssSelector !== "") {
            var validParentNodes = document.querySelectorAll(cssSelector);
        }

        parents = [];

        if (this.nodes.length > 0) {
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

    // 7. Click handler
    MakeBelieveElement.prototype.onClick = function (callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("click", callback);
        };
    }

    // 8. Insert text method
    MakeBelieveElement.prototype.insertText = function (text) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].textContent = text;
        };
    }

    function isValidHtml(string) {
        var doc = document.createElement('div');
        doc.innerHTML = string;
        return (doc.innerHTML === string);
    }

    function is_dom_element(htmlString) {
        return typeof htmlString === 'object' && htmlString.nodeType !== undefined;
    }

    // 9. Append HTML method
    MakeBelieveElement.prototype.append = function (htmlString) {
        if (isValidHtml(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].innerHTML += htmlString;
            };
        } else if (is_dom_element(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].appendChild(htmlString);
            };
        }
    }

    // 10. prepend HTML method
    MakeBelieveElement.prototype.prepend = function (htmlString) {
        if (isValidHtml(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].innerHTML = htmlString + this.nodes[i].innerHTML;
            };
        } else if (is_dom_element(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].insertBefore(htmlString, this.nodes[i].firstChild);
            };
        }
    }

    // 11. delete method
    MakeBelieveElement.prototype.delete = function (cssSelector = "") {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].parentNode.removeChild(this.nodes[i]);
        };
    }

    // 13. css() method
    MakeBelieveElement.prototype.css = function (cssElement, cssElementVal) {
        //document.getElementById("myH1").style.color = "red"; 
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].style[cssElement] = cssElementVal;
        };
    }

    // 14. toggleClass() implementation
    MakeBelieveElement.prototype.toggleClass = function (someClass) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].classList.toggle(someClass);
        };
    }

    // 15. submit handler for forms
    MakeBelieveElement.prototype.onSubmit = function (callback) {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("submit", callback);
        }
    }

    // 16. input handler for input tags
    MakeBelieveElement.prototype.onInput = function (callback) {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("input", callback);
        }
    }

    // 12. JQuery ajax method
    globalObj.ajax = function (object = {
        url: '',
        method: 'GET',
        timeout: 0,
        data: {},
        headers: {},
        success: null,
        fail: null,
        beforeSend: null
    }) {
        if (object.url !== "") {
            console.log("Yay url");

            var request = new XMLHttpRequest();
            request.open(object.method, object.url);
            request.timeout = object.timeout

            for (let header in request.headers) {
                request.setRequestHeader(header, request.headers[header]);
            }

            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        object.success(request.responseText);
                    } else {
                        object.fail(request.responseText);
                    }
                }
                console.log(request.readyState);
            };

            if (object.beforeSend) {
                object.beforeSend(request);
            }

            request.send(data);
        } else {
            console.log("Url missing");
        }
    }

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

// // testing ancestor
// var ancestor1 = __('#password').ancestor();
// var ancestor2 = __('#password').ancestor('.ancestor');
// var rootElem = __('#password').ancestor('.root');
// var ancestorSib = __('#password').ancestor('.ancestor-sib');

// console.log(ancestor1); // Returns div with class .ancestor
// console.log(ancestor2); // Returns div with class .ancestor
// console.log(rootElem); // Returns div with class .root
// console.log(ancestorSib); // Returns empty

//testing onClick
__("#password").onClick(function (evt) {
    console.log(evt.target.value);
})

// testing add text
__("#shakespeare-novel").insertText("If you can't love urself, how in the hell u gon' love somebody else.")

//__("#shakespeare-novel").delete()

// // testing on submit
// __("#my-form").onSubmit(function (evt) {
//     console.log("Hello from submit");
// })

// // testing in input
// __("#username").onInput(function (evt) {
//     console.log("Hello from input");
// })

// testing append
__(".the-appender").append("I am an appended paragraph!")
__(".the-appender").append(document.createElement('p').appendChild(document.createTextNode("I am an appended paragraph!")));

// testing prepend
__(".the-prepender").prepend("I am a prepended paragraph!")
__(".the-prepender").prepend(document.createElement('p').appendChild(document.createTextNode("I am a prepended paragraph!")));

var herokuUrl = 'https://serene-island-81305.herokuapp.com';

// testing ajax
__.ajax({
    url: herokuUrl,
    method: 'GET',
    timeout: 10,
    data: {},
    headers: { 'Authorization': 'my-secret-key' },
    success: function (resp) {
        console.log(resp);
    },
    fail: function (error) {
        console.log(error);
    },
    beforeSend: function (xhr) {
        console.log("Hello from beforeSend");
    }
});

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