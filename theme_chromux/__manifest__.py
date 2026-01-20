{
    'name': 'Chromux Theme',
    'description': 'Chromux Browser Website Theme',
    'version': '1.0',
    'author': 'Chromux',
    'category': 'Theme/Creative',
    'depends': ['website'],
    'data': [
        'views/pages.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_chromux/static/src/css/style.css',
            'theme_chromux/static/src/js/script.js',
        ],
    },
    'application': False,
    'auto_install': False,
    'installable': True,
    'license': 'LGPL-3',
}
