import Handlebars from 'handlebars';

window.uploadcareStoreFilesOnSubmit = window.uploadcareStoreFilesOnSubmit || [];

this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};

this["MediumInsert"]["Templates"]["src/js/templates/uploadcare-fileupload.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input class=\"uploadcareInput\" type=\"file\">";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/uploadcare-image.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"medium-insert-images-progress\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<figure contenteditable=\"false\">\n    <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.progress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</figure>";
},"useData":true});

let pluginName = 'mediumInsert',
    addonName = 'UploadCarePlugin',
    defaults = {
        label: '<span class="fa fa-cloud-upload"></span>'
    }

export const UploadCarePlugin = function (el, options) {
    this.el = el;
    this.$el = $(el);
    this.templates = window.MediumInsert.Templates;
    this.core = this.$el.data('plugin_'+ pluginName);

    this.options = $.extend(true, {}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
};

UploadCarePlugin.prototype.init = function () {
    var $medium = this.$el.find('.medium-insert-uploadcare');

    $medium.find('figcaption').attr('contenteditable', true);
    $medium.find('figure').attr('contenteditable', false);

    this.events();
};

UploadCarePlugin.prototype.events = function () {
    this.$el.on('click', '.medium-insert-uploadcare img', $.proxy(this, 'selectMedium'));
};

UploadCarePlugin.prototype.getCore = function () {
    console.log('CORE <<<<<<<<<<<<<<<<', this.core);
    return this.core;
};

// Images.prototype.selectImage = function (e) {
//     if(this.core.options.enabled) {
//         var $image = $(e.target),
//             that = this;

//         this.$currentImage = $image;

//         // Hide keyboard on mobile devices
//         this.$el.blur();

//         $image.addClass('medium-insert-image-active');
//         $image.closest('.medium-insert-images').addClass('medium-insert-active');

//         setTimeout(function () {
//             that.addToolbar();

//             if (that.options.captions) {
//                 that.core.addCaption($image.closest('figure'), that.options.captionPlaceholder);
//             }
//         }, 50);
//     }
// };

UploadCarePlugin.prototype.selectMedium = function () {
    if (this.core.options.enabled) {
        let $medium = $(e.target);
        this.$currentMedium = $medium;
    },

    this.$el.blur();

    $medium.addClass('medium-insert-image-active');
    $medium.closest('.medium-insert-uploadcare').addClass('medium-insert-active');

    setTimeout(() => {
        this.addToolbar();
        if (this.options.captions) {
            this.core.addCaption($medium.closest('figure'), this.options.captionPlaceholder);
        }
    }, 50);
};

Images.prototype.addToolbar = function () {
    var $image = this.$el.find('.medium-insert-image-active'),
        $p = $image.closest('.medium-insert-images'),
        active = false,
        $toolbar, $toolbar2, top;

    var mediumEditor = this.core.getEditor();
    var toolbarContainer = mediumEditor.options.elementsContainer || 'body';

    $(toolbarContainer).append(this.templates['src/js/templates/images-toolbar.hbs']({
        styles: this.options.styles,
        actions: this.options.actions
    }).trim());

    $toolbar = $('.medium-insert-images-toolbar');
    $toolbar2 = $('.medium-insert-images-toolbar2');

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
        if ($p.hasClass('medium-insert-images-'+ $(this).data('action'))) {
            $(this).addClass('medium-editor-button-active');
            active = true;
        }
    });

    if (active === false) {
        $toolbar.find('button').first().addClass('medium-editor-button-active');
    }
};

UploadCarePlugin.prototype.add = function () {
    uploadcare.openDialog(null, {
        imagesOnly: true,
        doNotStore: true
    }).done((file) => {
        file.done((fileInfo) => {
            console.log(fileInfo);
            window.uploadcareStoreFilesOnSubmit.push(fileInfo);
            let $place = this.$el.find('.medium-insert-active');
            // File uploading succeeded
            if ($place.is('p')) {
                $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
                $place = this.$el.find('.medium-insert-active');
                this.core.moveCaret($place);
            }
            $place.addClass('medium-insert-uploadcare');
            // new new window.Image()

            $(this.templates['src/js/templates/uploadcare-image.hbs']({
                img: fileInfo.cdnUrl,
                progress: this.options.preview
            })).appendTo($place);

            $place.find('br').remove();

        }).fail((error) => {
            console.log("UPLOADCARE UPLOAD ERROR: " + error);
        });
    }).fail((error, fileInfo) => {
        // User just has closed the dialog by pressing ESC or clicking on "×"
        alert(error, fileInfo);
    });
};

UploadCarePlugin.prototype.createDOMImage = function () {
    return new window.Image();
};

$.fn[pluginName + addonName] = function (options) {
    console.log(this);
    return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName + addonName)) {
            $.data(this, 'plugin_' + pluginName + addonName, new UploadCarePlugin(this, options));
        }
    });
};
