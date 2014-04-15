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
			format: 'module', // format of translated js source file
			original: 'en', // original lang
			path: 'LC_MESSAGES', // subfolder for PO file
			filename: 'messages.po' // PO filename
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
				var poObject = po.load( filepath ),
					jsonLang = filepath.substring( 0, filepath.indexOf( options.path + ( options.path.length ? '/' : '' ) + options.filename ) ).substr( -3, 2 ) ,
					jsonMessage = {};

				poObject.messages.forEach( function( message ) {
					jsonMessage[ message.references.join('') ] = jsonLang === options.original ? message.msgid : message.msgstr.join('');
				});

				result[ jsonLang ] = jsonMessage;
				return true;
			});

			// Save to file
			grunt.file.write( f.dest, options.format === 'module' ? 'exports.I18N = ' + JSON.stringify( result, null,  '\t' ) : JSON.stringify( result, null,  '\t' ) );
			grunt.log.writeln( 'File "' + f.dest + '" created.' );
		});
	});
};
