
# React.hiccup

**React 0% JSX, 100% hiccup**

Dig [React](http://facebook.github.io/react/) but JSX feels a bit weird? React.hiccup to the rescue!

React.hiccup is a complete replacement for JSX written in [sweet.js](http://sweetjs.org).

React.hiccup uses a very clean, minimalistic notation - no HTML tags and no curly braces in HTML elements.


## Syntax

React.hiccup syntax is heavily inspired by [hiccup](https://github.com/weavejester/hiccup), a popular [Clojure](http://clojure.org) HTML rendering library.

In short, the syntax for a React.hiccup element is

```js
hiccup [tag#id.class1.class2 {property1: value1, property2: value2} child1 child2 ...]
```

e.g.

```js
hiccup [div#foo.bar.baz {some: "property", another: this.props.anothervalue} 
         [p "A child element"] "Child text"]
```

where the id, classes, property object and children are all optional. The className can be also specified 
among the properties, in this case it will be merged with the class names given after the tag.

A child can be a variable identifier

```js
var comment = "Some comment";
hiccup [div#foo.bar.baz "The comment is: " comment]
```

but in case it is anything more complex, e.g. an expression, it needs to be surrounded by parentheses

```js
hiccup [div#foo.bar.baz "The comment is: " (this.state.comment)]
```

or

```js
var one_or_two = 1;
var comment1 = "First comment";
var comment2 = "Second comment";
hiccup [div#foo.bar.baz "The comment is: " (one_or_two == 1 ? comment1 : comment2 )]
```

Note that this is not required in the property object

```js
var one_or_two = 1;
var comment1 = "First comment";
var comment2 = "Second comment";
hiccup [div#foo.bar.baz {someprop: 1 > 0 ? true : false, someother: "other" + "prop" } "A child"]
```


## Shorthand react class declaration

React.hiccup also comes with an optional macro `rclass` for declaring a React class

```js
rclass FooBar = {
  render: function() { ... }
}
```

expands to (omitting the sweet.js gensym)

```js
var FooBar = React.createClass({
  render: function() { ... }
});
```

while 

```js
rclass window.FooBar = {
  render: function() { ... }
}
```

expands to

```js
window.FooBar = React.createClass({
  render: function() { ... }
});
```


## Get it

First install [sweet.js](http://sweetjs.org) if you don't have it already

    $ npm install -g sweet.js

Then

    $ npm install react.hiccup

All set. Now to compile a React.hiccup js file into a plain js file do

    $ sjs -m react.hiccup/macros -o foo_build.js foo.js

To watch the file and have it automatically compiled whenever the file changes on disk

    $ sjs -m react.hiccup/macros -o foo_build.js -w foo.js


## Examples

### React frontpage examples

Here's how [React frontpage examples](http://facebook.github.io/react/) can be 
written [using React.hiccup](https://github.com/lantiga/react.hiccup/blob/master/examples.md).

### React tutorial

For something more involved you can take a look at the [React tutorial](http://facebook.github.io/react/docs/tutorial.html).

Here's the code in [JSX](https://github.com/lantiga/react.hiccup/blob/master/react_tutorial/tutorial.jsx), and
here's the same code in [React.hiccup](https://github.com/lantiga/react.hiccup/blob/master/react_tutorial/tutorial.sjs).


## License

MIT license http://www.opensource.org/licenses/mit-license.php/

Copyright (C) 2014 Luca Antiga http://lantiga.github.io
 
