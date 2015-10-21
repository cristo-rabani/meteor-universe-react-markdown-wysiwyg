import MediumEditor from './editor/medium-editor';
import i18n from '{universe:i18n}';

const T = i18n.createComponent('universe:react-markdown-wysiwyg');

export default React.createClass({
    displayName: 'HtmlMediumEditor',

    getInitialState () {
        return {
            text: UniHTML.purify(this.props.html)
        };
    },

    getDefaultProps () {
        return {
            tag: 'div'
        };
    },

    componentDidMount () {
        var dom = React.findDOMNode(this);
        this.medium = new MediumEditor(dom, UniUtils.deepExtend(options, this.props.options || {}));
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
    },

    componentWillUnmount () {
        this.medium.destroy();
    },

    componentWillReceiveProps (nextProps) {
        if (nextProps.text !== this.state.text && !this._updated) {
            this.setState({text: UniHTML.purify(nextProps.html)});
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
            this.props.onChange(text);
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