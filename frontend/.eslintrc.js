// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// Other configs...
	"globals": {
		"$": true,
		"jQuery": true
	},
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// use tab
		'indent': [ 'warn', 'tab', { 'SwitchCase': 1 } ],
		// no need for space
		'space-before-function-paren': [ 'error', 'never'],
		// Allow constructor calls using the new keyword without storing to a variable.
		'no-new': 0,
		// semicolons required
		'semi': [ 'error', 'always' ],
		'curly': [ 'error', 'multi-or-nest' ],
		'brace-style': [ 'error', 'stroustrup' ],
		'no-multiple-empty-lines': [2, { "max": 2, "maxEOF": 2 }],
		'no-tabs': 0
	}
}
