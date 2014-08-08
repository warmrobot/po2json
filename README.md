# grunt-po2json

> Convert i18n PO format to JSON files

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-po2json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-po2json');
```

## The "po2json" task

### Overview
In your project's Gruntfile, add a section named `po2json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	po2json: {
		options: {
			// Task-specific options go here.
		},
		your_target: {
			// Target-specific file lists and/or options go here.
		}
	}
});
```

### Options

#### options.format
Type: `String`
Values: `'module' | 'json'`
Default value: `'module'`

Format of source file

#### options.original
Type: `String`
Default value: `'en'`

Original language

#### options.path
Type: `String`
Default value: `'LC_MESSAGES'`

Optional path within locale directory

#### options.filename
Type: `String`
Default value: `'messages.po'`

Filename of result file

#### options.template
Type: `Function`
Default value: `null`

Template source files with a custom function.

### Usage Examples

#### Default Options
In this example, the default options are used to convert PO file to JS module.

```js
grunt.initConfig({
	po2json: {
		options: {},
		files: {
			'path/to/result/json': 'path/to/directory-with-po'
		}
	}
});
```

#### Custom Options
In this example, result will be saved in JSON format.

```js
grunt.initConfig({
	po2json: {
		options: {
			format  : 'json',
			original: 'ru',
			path    : 'LCCC',
			filename: 'locale.po',
			template: function (data, file) {
				return 'define(function() {\n' +
					'\treturn ' + data + ';\n' +
				'});\n';
			}
		},
		files: {
			'path/to/result/json': 'path/to/directory-with-po'
		}
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
