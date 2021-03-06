import React from 'react';
import ReactDOM from 'react-dom';
import toMarkdown from 'to-markdown';
import {Showdown} from 'meteor/markdown';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent('universe:react-markdown-wysiwyg');

const converter = new Showdown.converter();

export default React.createClass({
    displayName: 'MarkdownMediumEditor',

    getInitialState () {
        return {
            text: converter.makeHtml(this.props.markdown || '')
        };
    },

    getDefaultProps () {
        return {
            tag: 'div'
        };
    },

    componentDidMount () {
        var dom = ReactDOM.findDOMNode(this);
        var MediumEditor = require('medium-editor');
        this.medium = new MediumEditor (dom, UniUtils.deepExtend(options, this.props.options || {}));
        this.medium.subscribe('editableInput', () => {
            this._updated = true;
            // temporally bugfix of issue #145
            $('p > ol, p > ul, p > p', dom).each(function () {
                $(this).unwrap();
            });
            $('li > span ~ br', dom).remove();
            $('li > p', dom).each(function () {
                let $this = $(this);
                $this.parents(':first').html($this.html());
            });
            this.change(dom.innerHTML);
        });
        this.medium.subscribe('blur', () => {
            this._updated = true;
            // temporally bugfix of issue #145
            $('p > ol, p > ul, p > p', dom).each(function () {
                $(this).unwrap();
            });
            $('li > span ~ br', dom).remove();
            $('li > p', dom).each(function () {
                let $this = $(this);
                $this.parents(':first').html($this.html());
            });
            this.blur(dom.innerHTML);
        });
    },

    componentWillUnmount () {
        this.medium.destroy();
    },

    componentWillReceiveProps (nextProps) {
        if (nextProps.text !== this.state.text && !this._updated) {
            this.setState({text: converter.makeHtml(nextProps.markdown)});
        }

        if (this._updated) {
            this._updated = false;
        }
    },

    render () {
        return React.createElement(this.props.tag, {
            className: this.props.className,
            contentEditable: true,
            style: this.props.style,
            dangerouslySetInnerHTML: {__html: this.state.text}
        });
    },

    change (text) {
        if (this.props.onChange) {
            this.props.onChange(getMarkdown(text));
        }
    },

    blur (text) {
        if (this.props.onBlur) {
            this.props.onBlur(getMarkdown(text));
        }
    }
});

var options = {
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

var toMarkdownOptions = {converters:[{
    filter: 'pre',
    replacement: function(content) {
        return '`' + content + '`';
    }
}]};

function getMarkdown (text) {
    text = UniHTML.purify(text, {withoutTags: ['span']});
    return (toMarkdown(text, toMarkdownOptions).split('\n').map(function (c) {
        return c.trim();
    }).join('\n').trim());
}