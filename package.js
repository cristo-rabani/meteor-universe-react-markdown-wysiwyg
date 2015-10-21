Package.describe({
    name: 'universe:react-markdown-wysiwyg',
    version: '1.0.0',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('universe:modules');
    api.use('vazco:universe-html-purifier@1.2.3');
    api.use('universe:modules@0.6.0');
    api.use('universe:modules-npm@0.9.4');
    api.use('universe:utilities-react@0.5.2');
    api.use('underscore@1.0.4');
    api.use('markdown@1.0.5');
    api.use('universe:i18n@1.1.8');
    api.addFiles('en.i18n.yml');
    api.addFiles('editor.npm.json');
    api.addFiles('mixins/on-resize.import.jsx');
    api.addFiles('ReactMediumEditor.import.jsx');
    api.addFiles('DoubleMarkdownComponent.import.jsx');
});
