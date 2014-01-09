
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var converter = new Showdown.converter();

rclass Comment = {
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return hiccup
      [div.comment 
        [h2.commentAuthor (this.props.author)]
        [span {dangerouslySetInnerHTML:({__html: rawMarkup})}]];
  }
}

rclass CommentList = {
  render: function() {
    var commentNodes = this.props.data.map(function (comment,i) {
      return hiccup [Comment {key: i, author: comment.author} (comment.text)];
    });
    return hiccup [div.commentList commentNodes];
  }
}

rclass CommentForm = {
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onCommentSubmit({author:author, text:text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return hiccup
      [form.commentForm {onSubmit: this.handleSubmit}
       [input {type: "text", placeholder: "Your name", ref: "author"}]
       [input {type: "text", placeholder: "Say something...", ref: "text"}]
       [input {type: "submit", value:"Post"}]]
  }
}

rclass CommentBox = {
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return hiccup [div.commentBox
                   [h1 "Comments"]
                   [CommentList {data: this.state.data}]
                   [CommentForm {onCommentSubmit: this.handleCommentSubmit}]]}
}

React.renderComponent(
  hiccup [CommentBox {url: "comments.json", pollInterval: 2000}],
  document.getElementById('content')
);

