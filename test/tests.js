
hiccup [div]
hiccup [div#foo]
hiccup [div.bar]
hiccup [div.bar.baz]
hiccup [div#foo.bar.baz]

hiccup [div {foo: 'bar'}]
hiccup [div#foo {foo: 'bar'}]
hiccup [div.bar {foo: 'bar'}]
hiccup [div.bar.baz {foo: 'bar'}]
hiccup [div#foo.bar.baz {foo: 'bar'}]

hiccup [div "text"]
hiccup [div#foo "text"]
hiccup [div#foo-bar "text"]
hiccup [div.bar "text"]
hiccup [div.bar-baz "text"]
hiccup [div.bar.baz "text"]
hiccup [div#foo.bar.baz "text"]
hiccup [div#foo.bar.baz "text" [p#biz.bus "text2"]]
hiccup [div#foo.bar.baz [FooBar#biz.bus {bla: "bee", blu: "fooba", className: "secco"} "text2"] "text" 2 1.0]
hiccup [div#foo.bar.baz [FooBar#biz.bus {bla: "bee"}  "text2"] "text" 2 1.0]
hiccup [p#biz.bus {bla: "bee"} "text2"] 

hiccup [div `foo
bar
baz`]

hiccup [div#foo-bar "text"]
hiccup [div#foo--bar "text"]
hiccup [div#foo-bar5bar "text"]
hiccup [div#foo-bar5bar2 "text"]
hiccup [div.foo-bar "text"]
hiccup [div.foo--bar "text"]
hiccup [div.foo-bar5bar "text"]
hiccup [div.foo-bar5bar2 "text"]
hiccup [div#foo-bar.foo-bar "text"]
hiccup [div#foo--bar.foo--bar "text"]
hiccup [div#foo-bar5bar.foo-bar5bar "text"]
hiccup [div#foo-bar5bar2.foo-bar5bar2 "text"]

hiccup [div#foo.bar.baz [FooBar.bus {bla: "bee", blu: "fooba", className: "secco"} "text2"] "text" 2 1.0]
hiccup [div#id "text" "text2"]

hiccup [p {"a": 1, "b": 2} [div [p "a"]] "b" "c" ]
hiccup [p {"a": 1, "b": 2} [FooBar [div "a"]] ]
hiccup [div.foo "a"]
hiccup [div 1]
hiccup [div]

hiccup [p "a" "b" "c" ]

hiccup [p {a: 1, b: 2} "b" "c" ]
hiccup [p "a" "b" "c" ]

hiccup [p ("a"+"b") "c" ]
hiccup [p ("a"+"b") (this.state.foobar) ]

rclass Foobar = { render: function() { console.log('a'); } }
hiccup [Foobar "text"]

rclass window.Foobaz = { render: function() { console.log('a'); } }
hiccup [Foobaz "text"]

