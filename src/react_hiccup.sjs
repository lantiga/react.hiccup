/**
 * React.hiccup hiccup notation for React.js
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * Copyright (C) 2014 Luca Antiga http://lantiga.github.io
 */

macro _restargs {
  rule { () } => { null }
  rule { ($first) } => { hiccup $first }
  rule { ($first $rest ...) } => { hiccup $first, _restargs ($rest ...) }
}

macro _tag {
  case { _ $t } => { 
    var knownTags = {
      a:true, abbr:true, address:true, area:true, article:true, aside:true, audio:true, 
      b:true, base:true, bdi:true, bdo:true, big:true, blockquote:true, body:true, br:true, 
      butto:true, canva:true, caption:true, cite:true, code:true, col:true, colgroup:true, 
      data:true, datalist:true, dd:true, del:true, details:true, dfn:true,
      div:true, dl:true, dt:true, em:true, embed:true, fieldset:true, figcaption:true, 
      figure:true, footer:true, form:true, h1:true, h2:true, h3:true, h4:true, h5:true, h6:true,
      head:true, header:true, hr:true, html:true, i:true, iframe:true, img:true, input:true, 
      ins:true, kbd:true, keygen:true, label:true, legend:true, li:true, link:true, main:true,
      map:true, mark:true, menu:true, menuitem:true, meta:true, meter:true, nav:true, noscript:true, 
      object:true, ol:true, optgroup:true, option:true, output:true,
      p:true, param:true, pre:true, progress:true, q:true, rp:true, rt:true, ruby:true, s:true, 
      samp:true, script:true, section:true, select:true, small:true, source:true,
      span:true, strong:true, style:true, sub:true, summary:true, sup:true, table:true, 
      tbody:true, td:true, textarea:true, tfoot:true, th:true, thead:true, time:true,
      title:true, tr:true, track:true, u:true, ul:true, "var":true, video:true, wbr:true,
      circle:true, g:true, line:true, path:true, polygon:true, polyline:true, rect:true, 
      svg:true, text:true
    };
    var tagStr = unwrapSyntax(#{$t});
    if (knownTags[tagStr]) {
      return #{React.DOM.$t}
    }
    return #{$t} 
  }
}

macro _args {

  case { $name $x ... } => { 

    var tokens = #{$x ...}.map(function(el) { return unwrapSyntax(el); });

    var offset = 0;

    var id = "", className = "";
    if (tokens[0] == '#') {
      tokens.shift();
      id = tokens.shift();
      offset += 2;
    }
    while (tokens[0] == '.') {
      tokens.shift();
      className += " " + tokens.shift();
      offset += 2;
    }

    var hmap;
    if (tokens.length > 0 && tokens[0].value == '{}') {
      hmap = #{$x ...}[offset];
      offset += 1;
    }

    letstx $id = [makeValue(id,#{$name})], 
           $c = [makeValue(className,#{$id})];

    var children = #{$x ...}.slice(offset);
    letstx $children ... = children;

    if (hmap === undefined && children.length == 0) {
      if (id != "" && className != "") {
        return #{ {className: $c, id: $id} } 
      }
      else if (id == "" && className == "") {
        return #{ null } 
      }
      else if (className != "") {
        return #{ {className: $c} } 
      }
      else {
        return #{ {id: $id} } 
      }
    }

    if (hmap === undefined) {
      if (id != "" && className != "") {
        return #{ {className: $c, id: $id}, _restargs($children ...) } 
      }
      else if (id == "" && className == "") {
        return #{ null, _restargs($children ...) } 
      }
      else if (className != "") {
        return #{ {className: $c}, _restargs($children ...) } 
      }
      else {
        return #{ {id: $id}, _restargs($children ...) } 
      }
    }

    var classNameIndex;

    for (var i=0; i<hmap.token.inner.length; i++) {
      if (hmap.token.inner[i].token.value == 'className') {
        classNameIndex = i+2;
        break;
      }
    }

    if (classNameIndex !== undefined) {
      hmap.token.inner[classNameIndex].token.value += className;
    }
    else if (className != "") {
      hmap.token.inner = hmap.token.inner.concat([makePunc(',',#{$c}),makeIdent("className",#{$c}),makePunc(":",#{$c}),makeValue(className,#{$c})]);
    }
  
    if (id != "") {
      hmap.token.inner = hmap.token.inner.concat([makePunc(',',#{$id}),makeIdent("id",#{$id}),makePunc(":",#{$id}),makeValue(id,#{$id})]);
    }

    letstx $hmap = [hmap];

    return #{ $hmap, _restargs($children ...) } 
  }
}

macro _value {
  case {_ $x} => {
    var temp = #{$x}[0];
    if (temp.token.type == 10) {
      var tempString = temp.token.value.raw;
      letstx $newTemp = [makeValue(tempString, #{x})];
      return #{$newTemp}
    }
    return #{$x}
  }
}

macro hiccup {

  rule { [ $t $args ... ] } => {
    _tag $t(_args $args ...) 
  }

  rule { $x } => { _value $x }
}

macro rclass {
  rule { $n.$m(.)... = $o:expr } => { $n.$m(.)... = React.createClass($o); }
  rule { $n:ident = $o:expr } => { var $n = React.createClass($o); }
}

export hiccup;

export rclass;

// TODO
// * better error handling in _args
// * allow attribute object to be an identifier; in this case merge className and id using a function
// * allow property access without brackets by improving _restargs

