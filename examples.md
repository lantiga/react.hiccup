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


