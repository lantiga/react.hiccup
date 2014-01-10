
# React.hiccup

**React 0% JSX, 100% hiccup**

Dig [React](http://facebook.github.io/react/) but JSX feels weird? React.hiccup to the rescue!

React.hiccup is a complete replacement for JSX in written using [sweet.js](http://sweetjs.org). React.hiccup uses a very clean, minimalistic notation - no HTML tags and no curly braces within HTML elements.


## Syntax

React.hiccup syntax is heavily inspired by [hiccup](https://github.com/weavejester/hiccup), a popular [Clojure](http://clojure.org) HTML rendering library.

In short, the syntax for a React.hiccup element is

```js
hiccup [tag#id.class1.class2 {attributes} child1 child2 ...]
```

e.g.

```js
hiccup [div#foo.bar.baz {some: "property", another: this.props.property} 
         [p "A child element"] "Child text"]
```

where the id, classes, attributes and children are all optional. The className can be also specified 
among the attributes, in this case it will be merged with the class names given after the tag.

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

Note that this is not required in the attributes.


## Complimentary rclass macro

React.hiccup also comes with an optional macro for declaring a React class

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

If you do have it, update it (0.4.0 is required)

    $ npm update -g sweet.js

Then get in your project directory

    $ wget https://raw2.github.com/lantiga/react.hiccup/master/react_hiccup.sjs

All set. Now to compile a React.hiccup js file into a plain js file do

    $ sjs -m ./react_hiccup.sjs -o foo_build.js foo.js

To watch the file and have it automatically compiled at every change

    $ sjs -m ./react_hiccup.sjs -o foo_build.js -w foo.js

(this appears to be currently broken in sweet.js)


## Examples

### React frontpage examples

Here's how [React frontpage examples](http://facebook.github.io/react/) can be 
written using React.hiccup.

#### A Simple Component

JSX

```js
/** @jsx React.DOM */
var HelloMessage = React.createClass({
  render: function() {
    return <div>{'Hello ' + this.props.name}</div>;
  }
});

React.renderComponent(<HelloMessage name="John" />, mountNode);
```

React.hiccup

```js
var HelloMessage = React.createClass({
  render: function() {
    return hiccup [div ('Hello' + this.props.name)];
  }
});

React.renderComponent(hiccup [HelloMessage {name: "John"}], mountNode);
```

or, using the rclass macro (we'll use it in the remainder of the examples)

```js
rclass HelloMessage = {
  render: function() {
    return hiccup [div ('Hello' + this.props.name)];
  }
}

React.renderComponent(hiccup [HelloMessage {name: "John"}], mountNode);
```

#### A Stateful Component

React.js

```js
var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return React.DOM.div({},
      'Seconds Elapsed: ', this.state.secondsElapsed
    );
  }
});

React.renderComponent(Timer({}), mountNode);
```

React.hiccup

```js
var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return hiccup [div 'Seconds Elapsed: ' (this.state.secondsElapsed)]
  }
});

React.renderComponent(hiccup [Timer], mountNode);
```

#### An Application

JSX 

```js
/** @jsx React.DOM */
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});
React.renderComponent(<TodoApp />, mountNode);
```

React.hiccup

```js
rclass TodoList = {
  render: function() {
    var createItem = function(itemText) {
      return hiccup [li itemText];
    };
    return hiccup [ul (this.props.items.map(createItem))];
  }
}
rclass TodoApp = {
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return hiccup
      [div
        [h3 "TODO"]
        [TodoList {items: this.state.items}]
        [form {onSubmit: this.handleSubmit}
          [input {onChange: this.onChange, value: this.state.text}]
          [button ('Add #' + (this.state.items.length + 1))]]];
  }
}
React.renderComponent(hiccup [TodoApp], mountNode);
```

#### A Component Using External Plugins

JSX 

```js
/** @jsx React.DOM */

var converter = new Showdown.converter();

var MarkdownEditor = React.createClass({
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.getDOMNode().value});
  },
  render: function() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.value)
          }}
        />
      </div>
    );
  }
});

React.renderComponent(<MarkdownEditor />, mountNode);
```

React.hiccup

```js

var converter = new Showdown.converter();

rclass MarkdownEditor = {
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.getDOMNode().value});
  },
  render: function() {
    return hiccup
      [div.MarkdownEditor
        [h3 "Input"]
        [textarea {onChange: this.handleChange,
                   ref: "textarea",
                   defaultValue: this.state.value}]
        [h3 "Output"]
        div.content {dangerouslySetInnerHTML: {__html: converter.makeHtml(this.state.value)}}];
     }
}

React.renderComponent(hiccup [MarkdownEditor], mountNode);
```

### React tutorial

For something more involved you can take a look at the [React tutorial](http://facebook.github.io/react/docs/tutorial.html).

Here's the code in [JSX](https://raw2.github.com/lantiga/react.hiccup/master/tutorial/tutorial.jsx), and
here's the same code in [React.hiccup](https://raw2.github.com/lantiga/react.hiccup/master/tutorial/tutorial.jsx).

## License

MIT license http://www.opensource.org/licenses/mit-license.php/

Copyright (C) 2014 Luca Antiga http://lantiga.github.io
 
