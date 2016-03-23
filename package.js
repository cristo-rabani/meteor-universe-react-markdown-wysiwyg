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

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.3-beta.11');
    // api.use('universe:modules@0.6.4');
    // DONE api.use('vazco:universe-html-purifier@1.2.3');
    // api.use('universe:modules-npm@0.9.7');
    // DONE api.use('universe:utilities-react@0.5.4');
    // api.use('universe:utilities@2.1.0');
    // api.use('underscore@1.0.4');
    // api.use('markdown@1.0.5');
    // api.use('jquery@1.11.4');
    // api.use('universe:i18n@1.2.1');

    api.use([
        'modules@0.5.0-modules.8',
        'ecmascript@0.4.0-modules.8',
        'vazco:universe-html-purifier@1.2.3',
        'universe:utilities-react@1.0.0-beta3',
        'universe:utilities@2.2.2',
        'underscore',
        'markdown@1.0.5',
        'jquery@1.11.5-modules.8',
        'universe-i18n@1.3.5'
    ])

    Npm.depends({
        "collapse-whitespace": "1.1.2",
        "to-markdown": "2.0.1",
        "medium-editor": "5.14.4",
        "rc-tabs": "5.5.0"
    });

    api.mainModule('index.js');

    api.addFiles([
        'styles/tabs.css',
        'styles/medium-editor.css',
        'styles/medium-editor-theme-beagle.css',
        'styles/default.css',
    ], 'client');

    api.addFiles([
        'en.i18n.yml',
        'editor.npm.json',
        'ReactMarkdownMediumEditor.import.jsx',
        'ReactHtmlMediumEditor.import.jsx',
        'DoubleMarkdownComponent.import.jsx'
    ]);

    // api.addFiles('en.i18n.yml');
    // api.addFiles('editor.npm.json');
    // api.addFiles('mixins/on-resize.import.jsx');
    // api.addFiles('ReactMarkdownMediumEditor.import.jsx');
    // api.addFiles('ReactHtmlMediumEditor.import.jsx');
    // api.addFiles('DoubleMarkdownComponent.import.jsx');
    // api.addFiles('index.import.js');
});
