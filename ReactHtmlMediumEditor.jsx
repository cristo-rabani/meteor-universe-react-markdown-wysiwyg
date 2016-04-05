import React from "react";
import ReactDOM from 'react-dom';
import MediumEditor from 'medium-editor';
import {_i18n as i18n} from 'meteor/universe:i18n';
import './vendor/medium-editor-insert-plugin/medium-editor-insert-plugin.js';

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
        var dom = ReactDOM.findDOMNode(this);
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
        if (this.props.insertPlugin) {
            $(dom).mediumInsert({
                editor: this.medium,
                enabled: true,
                addons: { // (object) Addons configuration
                    images: { // (object) Image addon configuration
                        label: '<span class="fa fa-camera"></span>', // (string) A label for an image addon
                        uploadScript: null, // DEPRECATED: Use fileUploadOptions instead
                        deleteScript: 'delete.php', // (string) A relative path to a delete script
                        deleteMethod: 'POST',
                        fileDeleteOptions: {}, // (object) extra parameters send on the delete ajax request, see http://api.jquery.com/jquery.ajax/
                        preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
                        captions: true, // (boolean) Enable captions
                        captionPlaceholder: 'Type caption for image (optional)', // (string) Caption placeholder
                        autoGrid: 3, // (integer) Min number of images that automatically form a grid
                        formData: {}, // DEPRECATED: Use fileUploadOptions instead
                        fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                            url: 'upload.php', // (string) A relative path to an upload script
                            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
                        },
                        styles: { // (object) Available image styles configuration
                            wide: { // (object) Image style configuration. Key is used as a class name added to an image, when the style is selected (.medium-insert-images-wide)
                                label: '<span class="fa fa-align-justify"></span>', // (string) A label for a style
                                added: function ($el) {console.log('justify!!!!!!!!!!!!!!!!!')}, // (function) Callback function called after the style was selected. A parameter $el is a current active paragraph (.medium-insert-active)
                                removed: function ($el) {} // (function) Callback function called after a different style was selected and this one was removed. A parameter $el is a current active paragraph (.medium-insert-active)
                            },
                            left: {
                                label: '<span class="fa fa-align-left"></span>'
                            },
                            right: {
                                label: '<span class="fa fa-align-right"></span>'
                            },
                            grid: {
                                label: '<span class="fa fa-times"></span>'
                            }
                        },
                        actions: { // (object) Actions for an optional second toolbar
                            remove: { // (object) Remove action configuration
                                label: '<span class="fa fa-arrows"></span>', // (string) Label for an action
                                clicked: function ($el) { // (function) Callback function called when an action is selected
                                    var $event = $.Event('keydown');

                                    $event.which = 8;
                                    $(document).trigger($event);   
                                }
                            },
                            bleble: { // (object) Remove action configuration
                                label: '<span class="fa fa-arrows"></span>', // (string) Label for an action
                                clicked: function ($el) { // (function) Callback function called when an action is selected
                                    var $event = $.Event('keydown');

                                    $event.which = 8;
                                    $(document).trigger($event);   
                                }
                            }
                        },
                        messages: {
                            acceptFileTypesError: 'This file is not in a supported format: ',
                            maxFileSizeError: 'This file is too big: '
                        },
                        uploadCompleted: function ($el, data) {} // (function) Callback function called when upload is completed
                    }
                }
            });
        }
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
