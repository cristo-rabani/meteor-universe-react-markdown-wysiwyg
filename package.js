Package.describe({
    name: 'universe:react-markdown-wysiwyg',
    version: '1.3.0',
    // Brief, one-line summary of the package.
    summary: 'Es6 modules with react components wysiwyg based on Medium Editor, It works with markdown in<->out',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cristo-rabani/meteor-universe-react-markdown-wysiwyg',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3');
    api.use('vazco:universe-html-purifier@1.2.3');
    api.use('universe:utilities-react@1.0.0');
    api.use('universe:utilities@2.3.2');
    api.use('ecmascript');
    api.use('underscore');
    api.use('markdown');
    api.use('jquery');
    api.use('universe:i18n@1.4.1');
    api.use('cristo:auto-install-npm');
    api.addFiles('check.deps.js', 'server');
    api.addFiles([
        'styles/tabs.css',
        'styles/medium-editor.css',
        'styles/medium-editor-theme-beagle.css',
        'styles/default.css'], 'client');
    
    api.addFiles('en.i18n.yml');
    api.mainModule('index.js', ['client']);
});
