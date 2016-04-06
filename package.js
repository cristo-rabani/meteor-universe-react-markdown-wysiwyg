Package.describe({
    name: 'universe:react-markdown-wysiwyg',
    version: '1.1.1',
    // Brief, one-line summary of the package.
    summary: 'Es6 modules with react components wysiwyg based on Medium Editor, It works with markdown in<->out',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cristo-rabani/meteor-universe-react-markdown-wysiwyg',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

// since meteor 1.3 isn't supporting the possibility of adding npm packages 
// to the client yet, then because of than it is required to add all below
// packages to the main repository of the project - WITHOUT IT THIS PACKAGE WILL NOT WORK

Npm.depends({
    "collapse-whitespace": "1.1.2",
    "to-markdown": "1.3.0",
    "medium-editor": "5.10.0",
    "rc-tabs": "5.5.0",
    "handlebars": "4.0.5",
    "jquery": "1.11.2",
    "jquery-sortable": "0.9.13",
    "blueimp-file-upload": "9.12.1",
    "blueimp-load-image": "2.6.1",
    "blueimp-canvas-to-blob": "3.3.0", 
    "tmpl": "1.0.4",
    "load-image": "1.0.0"
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.3-rc.10');

    api.use([
        'ecmascript',
        'vazco:universe-html-purifier@1.2.3',
        'universe:utilities-react@1.0.0-beta3',
        'universe:utilities@2.2.2',
        'underscore',
        'markdown@1.0.5',
        'jquery',
        'universe:i18n@1.3.5'
    ]);

    api.mainModule('index.js', 'client');

    api.addFiles([
        'styles/tabs.css',
        'styles/medium-editor.css',
        'styles/medium-editor-theme-beagle.css',
        'styles/default.css',
        'vendor/medium-editor-insert-plugin/medium-editor-insert-plugin.css',
        'uploadcare-medium-editor-insert-plugin.css'
    ], 'client');

    api.addFiles([
        'en.i18n.yml'
    ]);
});
