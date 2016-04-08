import Handlebars from 'handlebars';
import UCare from 'meteor/smalljoys:uploadcare';


this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};


this["MediumInsert"]["Templates"]["src/js/templates/uploadCarePlugin-image.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"medium-insert-uploadCarePlugin-progress\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<figure contenteditable=\"false\">\n    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.progress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</figure>";
},"useData":true});


this["MediumInsert"]["Templates"]["src/js/templates/uploadCarePlugin-toolbar.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "                <li>\n                    <button class=\"medium-editor-action\" data-action=\""
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"medium-insert-uploadCarePlugin-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n      <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.actions : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "     </ul>\n    </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "                  <li>\n                      <button class=\"medium-editor-action\" data-action=\""
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                  </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"medium-insert-uploadCarePlugin-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.actions : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});


let formsWithSubmitEvents = [];

/** Default values */
var pluginName = 'mediumInsert',
    addonName = 'UploadCarePlugin', // first char is uppercase
    defaults = {
        label: '<i class="fa fa-cloud-upload"></i>',
        deleteMethod: 'POST',
        deleteScript: 'delete.php',
        preview: true,
        captions: true,
        captionPlaceholder: 'Type caption for image (optional)',
        autoGrid: 3,
        fileUploadOptions: { // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
            url: 'upload.php',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        },
        fileDeleteOptions: {},
        styles: {
            wide: {
                label: '<span class="fa fa-align-justify"></span>',
                // added: function ($el) {},
                // removed: function ($el) {}
            },
            left: {
                label: '<span class="fa fa-align-left"></span>',
                // added: function ($el) {}
                // removed: function ($el) {}
            },
            right: {
                label: '<span class="fa fa-align-right"></span>',
                // added: function ($el) {},
                // removed: function ($el) {}
            },
            grid: {
                label: '<span class="fa fa-th"></span>',
                // added: function ($el) {},
                // removed: function ($el) {}
            }
        },
        actions: {
            remove: {
                label: '<span class="fa fa-times"></span>',
                clicked: function () {
                    var $event = $.Event('keydown');

                    $event.which = 8;
                    $(document).trigger($event);
                }
            }
        },
        sorting: function () {
            var that = this;

            $('.medium-insert-uploadCarePlugin').sortable({
                group: 'medium-insert-uploadCarePlugin',
                containerSelector: '.medium-insert-uploadCarePlugin',
                itemSelector: 'figure',
                placeholder: '<figure class="placeholder">',
                handle: 'img',
                nested: false,
                vertical: false,
                afterMove: function () {
                    that.core.triggerInput();
                }
            });
        },
        messages: {
            acceptFileTypesError: 'This file is not in a supported format: ',
            maxFileSizeError: 'This file is too big: '
        }
        // uploadCompleted: function ($el, data) {}
    };

function UploadCarePlugin (el, options) {
    this.el = el;
    this.$el = $(el);
    this.$currentImage = null;
    this.templates = window.MediumInsert.Templates;
    this.core = this.$el.data('plugin_'+ pluginName);

    this.options = $.extend(true, {}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    // Allow image preview only in browsers, that support's that
    if (this.options.preview && !window.FileReader) {
        this.options.preview = false;
    }

    // Extend editor's functions
    if (this.core.getEditor()) {
        this.core.getEditor()._serializePreUploadCarePlugin = this.core.getEditor().serialize;
        this.core.getEditor().serialize = this.editorSerialize;
    }

    this.init();
}

UploadCarePlugin.prototype.init = function () {
    var $images = this.$el.find('.medium-insert-uploadCarePlugin');

    $images.find('figcaption').attr('contenteditable', true);
    $images.find('figure').attr('contenteditable', false);

    this.events();
    this.backwardsCompatibility();
    this.sorting();
};

UploadCarePlugin.prototype.events = function () {
    $(document)
        .on('click', $.proxy(this, 'unselectImage'))
        .on('keydown', $.proxy(this, 'removeImage'))
        .on('click', '.medium-insert-uploadCarePlugin-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
        .on('click', '.medium-insert-uploadCarePlugin-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

    this.$el
        .on('click', '.medium-insert-uploadCarePlugin img', $.proxy(this, 'selectImage'));
};

UploadCarePlugin.prototype.backwardsCompatibility = function () {
    this.$el.find('.mediumInsert')
        .removeClass('mediumInsert')
        .addClass('medium-insert-uploadCarePlugin');

    this.$el.find('.medium-insert-uploadCarePlugin.small')
        .removeClass('small')
        .addClass('medium-insert-uploadCarePlugin-left');
};

UploadCarePlugin.prototype.editorSerialize = function () {
    var data = this._serializePreUploadCarePlugin();

    $.each(data, function (key) {
        var $data = $('<div />').html(data[key].value);

        $data.find('.medium-insert-uploadCarePlugin').find('figcaption, figure').removeAttr('contenteditable');

        data[key].value = $data.html();
    });

    return data;
};

UploadCarePlugin.prototype.add = function () {
    uploadcare.openDialog(null, this.core.options.uploadCareConfig).done((file) => {
        file.done((fileInfo) => {
            var $place = this.$el.find('.medium-insert-active');
            this.appendFileToFormData($place.closest('form'), fileInfo);
            this.core.hideButtons();
            // File uploading succeeded
            if ($place.is('p')) {
                $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
                $place = this.$el.find('.medium-insert-active');
                this.core.moveCaret($place);
            }
            $place.addClass('medium-insert-uploadCarePlugin');

            $.proxy(this, 'showImage', fileInfo)();

        }).fail((error) => {
            console.error("UPLOADCARE UPLOAD ERROR: " + error);
        });
    })

    // User just has closed the dialog by pressing ESC or clicking on "×" - this code is not necessary
    // .fail((error, fileInfo) => {
    //     alert(error, fileInfo);
    // });
};

UploadCarePlugin.prototype.appendFileToFormData = function ($form, fileInfo) {
    if (!$form.data('uploadcareImagesToStore')) {
        $form.data('uploadcareImagesToStore', []);
    }
    $form.data('uploadcareImagesToStore').push(fileInfo);
    this.appendSubmitEventForForm($form);
};

UploadCarePlugin.prototype.appendSubmitEventForForm = function ($form) {
    if (formsWithSubmitEvents.some(form => form.is($form))) {
        return;
    }

    $form.bind('submit', function (event) {
        event.preventDefault();
        $(this).data('uploadcareImagesToStore').forEach(function (fileInfo) {
            Ucare.store(fileInfo.uuid);
        });
    });
    formsWithSubmitEvents.push($form);
};

UploadCarePlugin.prototype.showImage = function (fileInfo, data) {
    var $place = this.$el.find('.medium-insert-active');

    // Hide editor's placeholder
    $place.click();

    // If preview is allowed and preview image already exists,
    // replace it with uploaded image
    $(this.templates['src/js/templates/uploadCarePlugin-image.hbs']({
        img: fileInfo.cdnUrl,
        progress: this.options.preview
    })).appendTo($place);

    $place.find('.medium-insert-uploadCarePlugin-progress').remove();
    $place.find('br').remove();

    if (this.options.autoGrid && $place.find('figure').length >= this.options.autoGrid) {
        $.each(this.options.styles, function (style, options) {
            var className = 'medium-insert-uploadCarePlugin-'+ style;

            $place.removeClass(className);

            if (options.removed) {
                options.removed($place);
            }
        });

        $place.addClass('medium-insert-uploadCarePlugin-grid');

        if (this.options.styles.grid.added) {
            this.options.styles.grid.added($place);
        }
    }

    this.core.triggerInput();
}

UploadCarePlugin.prototype.selectImage = function (e) {
    if(this.core.options.enabled) {
        var $image = $(e.target);
        this.$currentImage = $image;

        // Hide keyboard on mobile devices
        this.$el.blur();
        $image.addClass('medium-insert-image-active');
        $image.closest('.medium-insert-uploadCarePlugin').addClass('medium-insert-active');
        setTimeout(() => {
            this.addToolbar();

            if (this.options.captions) {
                this.core.addCaption($image.closest('figure'), this.options.captionPlaceholder);
            }
        }, 50);
    }
};

UploadCarePlugin.prototype.unselectImage = function (e) {
    var $el = $(e.target),
        $image = this.$el.find('.medium-insert-image-active');

    if ($el.is('img') && $el.hasClass('medium-insert-image-active')) {
        $image.not($el).removeClass('medium-insert-image-active');
        $('.medium-insert-uploadCarePlugin-toolbar, .medium-insert-uploadCarePlugin-toolbar2').remove();
        this.core.removeCaptions($el);
        return;
    }

    $image.removeClass('medium-insert-image-active');
    $('.medium-insert-uploadCarePlugin-toolbar, .medium-insert-uploadCarePlugin-toolbar2').remove();

    if ($el.is('.medium-insert-caption-placeholder')) {
        this.core.removeCaptionPlaceholder($image.closest('figure'));
    } else if ($el.is('figcaption') === false) {
        this.core.removeCaptions();
    }
    this.$currentImage = null;
};

UploadCarePlugin.prototype.removeImage = function (e) {
    var $image, $parent, $empty;

    if (e.which === 8 || e.which === 46) {
        $image = this.$el.find('.medium-insert-image-active');

        if ($image.length) {
            e.preventDefault();

            this.uploadcareDeleteFromTempStore($image);

            $parent = $image.closest('.medium-insert-uploadCarePlugin');
            $image.closest('figure').remove();

            $('.medium-insert-uploadCarePlugin-toolbar, .medium-insert-uploadCarePlugin-toolbar2').remove();

            if ($parent.find('figure').length === 0) {
                $empty = $parent.next();
                if ($empty.is('p') === false || $empty.text() !== '') {
                    $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                    $parent.before($empty);
                }
                $parent.remove();

                // Hide addons
                this.core.hideAddons();

                this.core.moveCaret($empty);
            }

            this.core.triggerInput();
        }
    }
};

UploadCarePlugin.prototype.uploadcareDeleteFromTempStore = function ($image) {
    let $form = $image.closest('form'),
        indexOfDeletedImg = null,
        imgUrl = $image.attr('src');

    $form.data('uploadcareImagesToStore') && $form.data('uploadcareImagesToStore').forEach((fileInfo, idx) => {
        if (imgUrl === fileInfo.cdnUrl) {
            Ucare.delete(fileInfo.uuid);
            indexOfDeletedImg = idx;
        }
    });

    indexOfDeletedImg != null && $form.data('uploadcareImagesToStore').splice(indexOfDeletedImg, 1);
};

UploadCarePlugin.prototype.addToolbar = function () {
    var $image = this.$el.find('.medium-insert-image-active'),
        $p = $image.closest('.medium-insert-uploadCarePlugin'),
        active = false,
        $toolbar, $toolbar2, top;

    var mediumEditor = this.core.getEditor();
    var toolbarContainer = mediumEditor.options.elementsContainer || 'body';

    $(toolbarContainer).append(this.templates['src/js/templates/uploadCarePlugin-toolbar.hbs']({
        styles: this.options.styles,
        actions: this.options.actions
    }).trim());

    $toolbar = $('.medium-insert-uploadCarePlugin-toolbar');
    $toolbar2 = $('.medium-insert-uploadCarePlugin-toolbar2');

    top = $image.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an image outset, 5px - distance from an image
    if (top < 0) {
        top = 0;
    }

    $toolbar
        .css({
            top: top,
            left: $image.offset().left + $image.width() / 2 - $toolbar.width() / 2
        })
        .show();

    $toolbar2
        .css({
            top: $image.offset().top + 2, // 2px - distance from a border
            left: $image.offset().left + $image.width() - $toolbar2.width() - 4 // 4px - distance from a border
        })
        .show();

    $toolbar.find('button').each(function () {
        if ($p.hasClass('medium-insert-uploadCarePlugin-'+ $(this).data('action'))) {
            $(this).addClass('medium-editor-button-active');
            active = true;
        }
    });

    if (active === false) {
        $toolbar.find('button').first().addClass('medium-editor-button-active');
    }
};

UploadCarePlugin.prototype.toolbarAction = function (e) {
    if (this.$currentImage === null) return;
    var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
        $li = $button.closest('li'),
        $ul = $li.closest('ul'),
        $lis = $ul.find('li'),
        $p = this.$el.find('.medium-insert-active'),
        that = this;

    $button.addClass('medium-editor-button-active');
    $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

    $lis.find('button').each(function () {
        var className = 'medium-insert-uploadCarePlugin-'+ $(this).data('action');

        if ($(this).hasClass('medium-editor-button-active')) {
            $p.addClass(className);

            if (that.options.styles[$(this).data('action')].added) {
                that.options.styles[$(this).data('action')].added($p);
            }
        } else {
            $p.removeClass(className);

            if (that.options.styles[$(this).data('action')].removed) {
                that.options.styles[$(this).data('action')].removed($p);
            }
        }
    });

    this.core.hideButtons();
    this.core.triggerInput();
};

UploadCarePlugin.prototype.toolbar2Action = function (e) {
    if (this.$currentImage === null) return;
    var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
        callback = this.options.actions[$button.data('action')].clicked;

    if (callback) {
        callback(this.$el.find('.medium-insert-image-active'));
    }

    this.core.hideButtons();
    this.core.triggerInput();
};

UploadCarePlugin.prototype.sorting = function () {
    $.proxy(this.options.sorting, this)();
};

$.fn[pluginName + addonName] = function (options) {
    return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName + addonName)) {
            $.data(this, 'plugin_' + pluginName + addonName, new UploadCarePlugin(this, options));
        }
    });
};
