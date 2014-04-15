/*
 * grunt-po2json
 * https://github.com/warmrobot/po2json
 *
 * Copyright (c) 2014 Igor Frolov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {

	// Project configuration.
	grunt.initConfig( {
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

		// Configuration to be run (and then tested).
		po2json: {
			module: {
				files: {
					'tmp/module/I18N.js': [ 'test/fixtures/**/*.po' ]
				}
			},

			json: {
				options: {
					format: 'json'
				},
				files: {
					'tmp/json/locale.json': [ 'test/fixtures/**/*.po' ]
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	} );

	// Actually load this plugin's task(s).
	grunt.loadTasks( 'tasks' );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask( 'test', ['clean', 'po2json', 'nodeunit'] );

	// By default, lint and run all tests.
	grunt.registerTask( 'default', ['jshint', 'test'] );

};
