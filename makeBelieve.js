(function () {

    // MakeBelieveElement constructor function
    function MakeBelieveElement(nodes) {
        // This means this instance of MakeBelieveElement
        this.nodes = nodes;

        var i = 0;

        if (nodes && nodes.length) {
            nodes.forEach(node => {
                this[i] = node;
                i += 1;
            });
        }
    }

    MakeBelieveElement.prototype.getLength = function () {
        return this.nodes.length;
    };

    function contains(list, element) {
        for (var i = 0; i < list.length; i++) {
            if (element == list[i]) {
                return true;
            }
            return false;
        }
    }

    // 4. Find parent method
    MakeBelieveElement.prototype.parent = function (cssSelector = "") {
        // If selector, find all elements that are valid
        var validParentNodes = {};

        if (cssSelector !== "") {
            validParentNodes = document.querySelectorAll(cssSelector);
        }

        var parents = [];

        if ((this.nodes.length) > 0) {
            for (var i = 0; i < this.nodes.length; i++) {
                var currentElement = this.nodes[i];
                var currentParent = currentElement.parentNode;

                if (!parents.includes(currentParent)) {
                    if (cssSelector !== "") {
                        if (validParentNodes.length > 0) {
                            if (contains(validParentNodes, currentParent)) {
                                parents.push(currentParent);
                            }
                        }
                    } else {
                        parents.push(currentParent);
                    }
                }
            }
        }

        return new MakeBelieveElement(parents);
    };

    // 5. grandParent method
    MakeBelieveElement.prototype.grandParent = function (cssSelector = "") {
        if (this.nodes.length == 1) {
            return this.parent().parent(cssSelector);
        }

        var validGrandparentNodes = {};

        // Find all valid nodes in the document if query
        if (cssSelector !== "") {
            validGrandparentNodes = document.querySelectorAll(cssSelector);
        }

        // Find all parents
        var parents = [];
        for (var i = 0; i < this.nodes.length; i++) {
            var currentElement = this.nodes[i];

            if (currentElement.parentNode) {
                var parent = currentElement.parentNode;
                parents.push(parent);
            }
        }

        var grandparents = [];

        // Find the first valid grandparent for every node and add to list
        for (var j = 0; j < parents.length; j++) {
            var currentParent = parents[j];

            if (currentParent.parentNode) {
                var currentGrandparent = currentParent.parentNode;

                if (!grandparents.includes(currentGrandparent)) {
                    if (cssSelector !== "") {
                        if (validGrandparentNodes.length > 0) {
                            for (i = 0; i < validGrandparentNodes.length; i++) {
                                if (validGrandparentNodes[j] === currentGrandparent) {
                                    grandparents.push(currentGrandparent);
                                }
                            }
                        }
                    } else {
                        grandparents.push(currentGrandparent);
                    }
                }
            }

        }
        return new MakeBelieveElement(grandparents);
    };

    // 6. Ancestor
    MakeBelieveElement.prototype.ancestor = function (cssSelector = "") {
        // Find all valid DOM elements if query
        var validAncestorNodes = {};

        // 
        if (cssSelector !== "") {
            validAncestorNodes = document.querySelectorAll(cssSelector);
        }

        // Find all grandparents
        var grandparents = this.grandParent();

        var ancestors = [];

        // Find one ancestor for each node
        for (var i = 0; i < grandparents.getLength(); i++) {
            var currentGrandparent = grandparents[i];

            if (cssSelector === "") {
                var ancestor = grandparents[i].parentNode;
                ancestors.push(ancestor);
            } else {
                if (currentGrandparent.parentNode) {
                    var currentAncestor = currentGrandparent.parentNode;

                    while (!contains(validAncestorNodes, currentAncestor) && currentAncestor) {
                        currentAncestor = currentAncestor.parentNode;
                    }

                    if (currentAncestor && !ancestors.includes(currentAncestor)) {
                        ancestors.push(currentAncestor);
                    }
                }
            }
        }

        return new MakeBelieveElement(ancestors);
    };

    // 7. Click handler
    MakeBelieveElement.prototype.onClick = function (callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("click", callback);
        }

        return this;
    };

    // 8. Insert text method
    MakeBelieveElement.prototype.insertText = function (text) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].textContent = text;
        }

        return this;
    };

    function isValidHtml(string) {
        var doc = document.createElement('div');
        doc.innerHTML = string;
        return (doc.innerHTML === string);
    }

    function isDomElement(htmlString) {
        return typeof htmlString === 'object' && htmlString.nodeType !== undefined;
    }

    // 9. Append HTML method
    MakeBelieveElement.prototype.append = function (htmlString) {
        if (isValidHtml(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].innerHTML += htmlString;
            }
        } else if (isDomElement(htmlString)) {
            for (var j = 0; j < this.nodes.length; j++) {
                this.nodes[j].appendChild(htmlString);
            }
        }
        return this;
    };

    // 10. prepend HTML method
    MakeBelieveElement.prototype.prepend = function (htmlString) {
        if (isValidHtml(htmlString)) {
            for (var i = 0; i < this.nodes.length; i++) {
                this.nodes[i].innerHTML = htmlString + this.nodes[i].innerHTML;
            }
        } else if (isDomElement(htmlString)) {
            for (var j = 0; j < this.nodes.length; j++) {
                this.nodes[j].insertBefore(htmlString, this.nodes[j].firstChild);
            }
        }
        return this;
    };

    // 11. delete method
    MakeBelieveElement.prototype.delete = function (cssSelector = "") {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].parentNode.removeChild(this.nodes[i]);
        }

        return this;
    };

    // 13. css() method
    MakeBelieveElement.prototype.css = function (cssElement, cssElementVal) {
        //document.getElementById("myH1").style.color = "red"; 
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].style[cssElement] = cssElementVal;
        }

        return this;
    };

    // 14. toggleClass() implementation
    MakeBelieveElement.prototype.toggleClass = function (someClass) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].classList.toggle(someClass);
        }

        return this;
    };

    // 15. submit handler for forms
    MakeBelieveElement.prototype.onSubmit = function (callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("submit", callback);
        }

        return this;
    };

    // 16. input handler for input tags
    MakeBelieveElement.prototype.onInput = function (callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].addEventListener("input", callback);
        }

        return this;
    };

    var query = function (query) {
        var elements = document.querySelectorAll(query);
        if (elements) {
            return new MakeBelieveElement(elements, elements.length);
        }

        return {};
    };

    // 12. JQuery ajax method
    query.ajax = function (object = {
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
            var request = new XMLHttpRequest();
            request.open(object.method, object.url);
            request.timeout = object.timeout;

            for (var header in object.headers) {
                request.setRequestHeader(header, object.headers[header]);
            }

            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        object.success(request.responseText);
                    } else {
                        object.fail(request.responseText);
                    }
                }
            };

            if (object.beforeSend) {
                object.beforeSend(request);
            }

            request.send(object.data);
        } else {
            console.log("Url missing.");
        }
    };

    // 1. Define the __ keyword
    window.__ = query;

})(window);