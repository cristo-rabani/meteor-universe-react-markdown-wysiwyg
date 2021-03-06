# Universe Markdown Wysiwyg
A few of react components, that providing visual editor of markdown.
As an editor engine this package use [medium editor](https://github.com/yabwe/medium-editor).

Translations of labels can be changed with [universe:i18n](https://atmospherejs.com/universe/i18n)


## Installation

Just add this package to your app:
```sh
meteor add universe:react-markdown-wysiwyg
//And if you not have yet:
meteor add universe:modules
```

## DoubleEditor (Visual and Textarea for markdown code)

Props: 
- className - additional class name
- markdown - markdown text to show
- onChange - function call on data changed
- options - options for medium editor

```
import DoubleEditor from 'meteor/universe:react-markdown-wysiwyg/DoubleMarkdownComponent';

In your component: 
...
 <DoubleEditor markdown='# Hello' onChange={console.log.bind(console)}/>;
...
```

### VisualEditor

Props:
- tag (default div)
- className - additional class name
- markdown - markdown text to show
- onChange - function call on data changed
- options - options for medium editor

```
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';

In your component: 
...
 <ReactMarkdownMediumEditor markdown='# Hello' onChange={console.log.bind(console)}/>;
...
```

### VisualHtmlEditor

Props:
- tag (default div)
- className - additional class name
- html - html to show
- onChange - function call on data changed
- options - options for medium editor

```
import ReactHtmlMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactHtmlMediumEditor';

In your component: 
...
 <ReactHtmlMediumEditor html='<h1>Hello</h1>' onChange={console.log.bind(console)}/>;
...
```


### default options for medium editor

```
options = {
    toolbar: {
        /* These are the default options for the toolbar,
         if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'h4', 'orderedlist', 'unorderedlist', 'indent', 'outdent', 'quote', 'pre'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        relativeContainer: null,
        buttonLabels: true
    },
    paste: {
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta', 'span']
    },
    placeholder: {
        text: T.__('typeYourText')
    }

};
```

### Additional in package

- onResizeMixin

```
import onResize from 'meteor/universe:react-markdown-wysiwyg/mixins/on-resize';
React.createClass({
  mixins: [onResize],
  render () {
    // By default, sets dimensions of window and docks to state 
    window: {height: window.innerHeight, width: window.innerWidth},
    document: {height: document.body.clientHeight, width: document.body.clientWidth}
    
    let {width, height} = this.state.window;
    return <div style={{ width, height }}>{children}</div>;
  }
}

or you can definied your own onResize function


React.createClass({
  mixins: [onResize],
  render () { 
    let {width, height} = this.state;
    return <div style={{ width, height }}>{children}</div>;
  },
  onResize () {
    this.setState({height: Math.max(ReactDOM.findDOMNode(this).clientHeight, 100)});
  }
}

```

- [rc-tabs@5.x](https://www.npmjs.com/package/rc-tabs)


- [medium editor@5.x](https://www.npmjs.com/package/medium-editor)


- [to-markdown@1.x](https://www.npmjs.com/package/to-markdown)
