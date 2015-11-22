Package.describe({
    name: 'universe:react-markdown-wysiwyg',
    version: '1.1.0',
    // Brief, one-line summary of the package.
    summary: 'Es6 modules with react components wysiwyg based on Medium Editor, It works with markdown in<->out',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cristo-rabani/meteor-universe-react-markdown-wysiwyg',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('universe:modules@0.6.1');
    api.use('vazco:universe-html-purifier@1.2.3');
    api.use('universe:modules-npm@0.9.5');
    api.use('universe:utilities-react@0.5.3');
    api.use('universe:utilities@2.1.0');
    api.use('underscore@1.0.4');
    api.use('markdown@1.0.5');
    api.use('jquery@1.11.4');
    api.use('universe:i18n@1.2.1');

    api.addFiles([
        'styles/tabs.css',
        'styles/medium-editor.css',
        'styles/medium-editor-theme-beagle.css',
        'styles/default.css'], 'client');

    api.addFiles('en.i18n.yml');
    api.addFiles('editor.npm.json');
    api.addFiles('mixins/on-resize.import.jsx');
    api.addFiles('ReactMarkdownMediumEditor.import.jsx');
    api.addFiles('ReactHtmlMediumEditor.import.jsx');
    api.addFiles('DoubleMarkdownComponent.import.jsx');
    api.addFiles('index.import.js');
});
