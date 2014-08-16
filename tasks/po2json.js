/*
 * grunt-po2json
 * https://github.com/warmrobot/po2json
 *
 * Copyright (c) 2014 Igor Frolov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {
	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	var path = require( 'path' ),
		util = require( 'util' ),
		po = require( './lib/po.js' ),
		cmd = require( './lib/cmd.js' );

	grunt.registerMultiTask( 'po2json', 'Convert PO files to JSON format', function () {
		var options = this.options({
			format  : 'module', // format of translated js source file
			original: 'en', // original lang
			path    : 'LC_MESSAGES', // subfolder for PO file
			filename: 'messages.po', // PO filename
			template: null // template source files with a custom function.
		});

		// Iterate over all specified file groups.
		this.files.forEach( function( f ) {
			var result = {};

			// Create array of content of src files
			var src = f.src.filter(function ( filepath ) {
				// Warn on and remove invalid source files (if nonull was set).
				if ( !grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}
			}).map( function ( filepath ) {
				// Read file source.
				var poObject    = po.load( filepath ),
					path        = filepath.indexOf( options.path + ( options.path.length ? '/' : '' ) + options.filename ),
					jsonMessage = {}
				;

				var locale = filepath.substring(0, path - 1).replace(/.*\//, '');

				poObject.messages.forEach( function( message ) {
					jsonMessage[ message.msgid ] = message.msgstr.join('');
				});

				result[ locale || options.original ] = jsonMessage;
				return true;
			});

			result = JSON.stringify(result, null, '\t' );

			if (options.format === 'module')  {
				result = 'exports.I18N = ' + result;
			}

			if (options.template) {
				result = options.template(result, f.dest);
			}

			// Save to file
			grunt.file.write( f.dest, result );
			grunt.log.writeln( 'File "' + f.dest + '" created.' );
		});
	});
};
