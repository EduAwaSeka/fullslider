require.config({
    paths: {
        libs: "../scripts/libs",
        preview_export: "../preview_export",
        jquery: "../scripts/libs/jQuery",
        jqueryui: "../scripts/libs/jquery-ui",
        touchpunch: "../scripts/libs/jquery-ui-touch-punch",
        "jquery.multisortable": "../scripts/libs/jquery.multisortable",
        position: "../components/jq-contextmenu/jquery.ui.position",
        jqContextMenu: "../components/jq-contextmenu/jquery.contextMenu",
        lodash: "../scripts/libs/lodash",
        backbone: "../scripts/libs/backbone",
        css: "../scripts/libs/css",
        bootstrap: "../components/bootstrap/bootstrap",
        colorpicker: "../components/spectrum/spectrum",
        handlebars: '../scripts/libs/Handlebars',
        lang: "../locales/lang",
        lexed: '../components/lexed/lexed',
        codemirror: '../components/codemirror',
        'marked': '../components/marked/marked',
        // build - rmap
        'strut/presentation_generator/bespoke': '../bundles/app/strut.presentation_generator.bespoke',
        'strut/presentation_generator/reveal': '../bundles/app/strut.presentation_generator.reveal',
        'strut/presentation_generator/handouts': '../bundles/app/strut.presentation_generator.handouts',
        'strut/deck': '../bundles/app/strut.deck',
        'strut/startup': '../bundles/app/strut.startup',
        'strut/editor': '../bundles/app/strut.editor',
        'strut/etch_extension': '../bundles/app/strut.etch_extension',
        'strut/exporter/zip/browser': '../bundles/app/strut.exporter.zip.browser',
        'strut/exporter': '../bundles/app/strut.exporter',
        'strut/exporter/json': '../bundles/app/strut.exporter.json',
        'strut/header': '../bundles/app/strut.header',
        'strut/importer': '../bundles/app/strut.importer',
        'strut/importer/json': '../bundles/app/strut.importer.json',
        'strut/presentation_generator/impress': '../bundles/app/strut.presentation_generator.impress',
        'strut/logo_button': '../bundles/app/strut.logo_button',
        'strut/presentation_generator': '../bundles/app/strut.presentation_generator',
        'strut/slide_components': '../bundles/app/strut.slide_components',
        'strut/slide_editor': '../bundles/app/strut.slide_editor',
        'strut/slide_snapshot': '../bundles/app/strut.slide_snapshot',
        'strut/storage': '../bundles/app/strut.storage',
        'strut/themes': '../bundles/app/strut.themes',
        'strut/well_context_buttons': '../bundles/app/strut.well_context_buttons',
        'strut/config': '../bundles/app/strut.config',
        'strut/transition_editor': '../bundles/app/strut.transition_editor',
        'tantaman/web': '../bundles/common/tantaman.web',
        'tantaman/web/local_storage': '../bundles/common/tantaman.web.local_storage',
        'tantaman/web/remote_storage': '../bundles/common/tantaman.web.remote_storage',
        'tantaman/web/saver': '../bundles/common/tantaman.web.saver',
        'tantaman/web/storage': '../bundles/common/tantaman.web.storage',
        'tantaman/web/undo_support': '../bundles/common/tantaman.web.undo_support',
        'tantaman/web/interactions': '../bundles/common/tantaman.web.interactions',
        'tantaman/web/widgets': '../bundles/common/tantaman.web.widgets',
        'tantaman/web/css_manip': '../bundles/common/tantaman.web.css_manip'
                // end build - rmap
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        "jquery.multisortable": {
            deps: ["jquery", "jqueryui"]
        },
        touchpunch: {
            deps: ["jquery", "jqueryui"]
        },
        jqueryui: {
            deps: ["jquery"]
        },
        colorpicker: {
            deps: ["jquery"]
        },
        gradientPicker: {
            deps: ["jquery", "colorpicker"]
        },
        position: {
            deps: ["jquery"]
        },
        jqContextMenu: {
            deps: ["jquery", "position"]
        },
        "codemirror/codemirror": {
            deps: ["css!../components/codemirror/codemirror.css"],
            exports: 'CodeMirror'
        },
        'codemirror/modes/css': {
            deps: ['codemirror/codemirror']
        },
        'codemirror/modes/markdown': {
            deps: ['codemirror/codemirror']
        }
    }
});



require([
    'handlebars',
    'lang',
    'compiled-templates',
    'colorpicker',
    'strut/config/config',
    'features',
    './StrutLoader',
    'bootstrap',
    'jqContextMenu',
    'css!components/jq-contextmenu/jquery.contextMenu.css',
    'touchpunch',
    'preview_export/scripts/dataset-shim',
    'strut/slide_editor/main',
    'strut/presentation_generator/bespoke'
],
        function(Handlebars, lang, empt, empty, config, registry, StrutLoader, bootstrap, ContextMenu, css, tp, dss,slide_editor) {
            
        });
