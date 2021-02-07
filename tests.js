// // // testing parent
// var paragraphs = __('p');
// var divs = __('.item');
// var parent = __('#password').parent();
// var formParent = __('#password').parent('form');
// var root = __('.root');

// console.log(paragraphs.parent()); // Should return paragraph_parent and body
// console.log(paragraphs.parent('#paragraph_parent')); // Should return paragraph_parent
// console.log(divs.parent()); // Should return body
// console.log(parent); // Should return my-form
// console.log(formParent); // Should return my-form
// console.log(root.parent()); // Should return body

// // testing grandParent
// var grandParent = __('#password').grandParent();
// var idGrandParent = __('#password').grandParent('#grandma');
// var paragraphsGrandParent = paragraphs.grandParent();
// var emptyGrandParent = __('#password').grandParent('#unknownId');

// console.log(grandParent); // returns the div with id #grandma
// console.log(idGrandParent); //  returns the div with id #grandma
// console.log(paragraphsGrandParent); // returns body and html
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

// //testing onClick
// __("#password").onClick(function (evt) {
//     console.log("You clicked password input");
// })

// // testing add text
// __("#shakespeare-novel").insertText("If you can't love urself, how in the hell u gon' love somebody else.")

// //testing delete
// __("#shakespeare-novel").delete()

// // testing on submit
// __("#my-form").onSubmit(function (evt) {
//     console.log("Hello from submit");
// })

// // testing in input
// __("#username").onInput(function (evt) {
//     console.log("Hello from input");
// })

// // testing append
// __(".the-appender").append("I am an appended paragraph!")
// __(".the-appender").append(document.createElement('p').appendChild(document.createTextNode("I am an appended paragraph!")));

// // testing prepend
// __(".the-prepender").prepend("I am a prepended paragraph!")
// __(".the-prepender").prepend(document.createElement('p').appendChild(document.createTextNode("I am a prepended paragraph!")));

// var herokuUrl = 'https://serene-island-81305.herokuapp.com';

// // testing ajax
// __.ajax({
//     url: herokuUrl,
//     method: 'POST',
//     timeout: 10,
//     data: { "meow": "meow" },
//     headers: { 'Authorization': 'my-secret-key' },
//     success: function (resp) {
//         console.log(resp);
//     },
//     fail: function (error) {
//         console.log(error);
//     },
//     beforeSend: function (xhr) {
//         console.log("Hello from beforeSend");
//     }
// });