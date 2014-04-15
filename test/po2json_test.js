'use strict';

var grunt = require( 'grunt' );

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.po2json = {
	setUp: function ( done ) {
		// setup here if necessary
		done();
	},

	moduleFormat: function ( test ) {
		test.expect( 1 );
		var actual = grunt.file.read( 'tmp/module/I18n.js' );
		var expected = grunt.file.read( 'test/expected/I18n.js' );
		test.equal( actual, expected, 'Module format. Generated JS match expected' );
		test.done();
	},

	jsonFormat: function ( test ) {
		test.expect( 1 );
		var actual = grunt.file.read( 'tmp/json/locale.json' );
		var expected = grunt.file.read( 'test/expected/I18n.json' );
		test.equal( actual, expected, 'JSON format. Generated JSON match expected' );
		test.done();
	},
};
