/*
 * image-optimization
 * https://github.com/prashantkoshta/image-optimization.git
 *
 * Copyright (c) 2017 Prashant Koshta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    image_optimization: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/**/*.png']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
          allowedsize:'2MB'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/**/*.png']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'image_optimization', 'nodeunit']);

  // By default, lint and run all tests.
 // grunt.registerTask('default', ['jshint', 'test']);
 grunt.registerTask('default', ['image_optimization']);

};
