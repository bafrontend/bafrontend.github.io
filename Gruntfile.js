'use strict';

module.exports = function(grunt) {
  var config = grunt.file.readJSON('config.json');

  // Project configuration
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'wintersmith_compile': {
      'build': {
        'options': {
          'output': './build/'
        }
      }
    },

    'uglify': {
      'options': {
        'mangle': true
      },
      'js': {
        'src': ['./src/js/*.js'],
        'dest': './build/js/build.js'
      }
    },

    'cssmin': {
      'options': {
        'keepSpecialComments': 0
      },
      'css': {
        'src': ['src/css/normalize.css', 'src/css/base.css', 'src/css/baf.css'],
        'dest': 'build/src/css/styles.min.css'
      }
    },

    'copy': {
      'assets': {
        'files': [
          {'expand': true, 'cwd': 'src/assets/', 'src': ['**'], 'dest': 'build/assets'}
        ]
      }
    },

    'htmlmin': {
      'dist': {
        'options': {
          'collapseWhitespace': true
        },
        'files': [
          { 'expand': true, 'cwd': 'build/', 'src': ['**/*.html'], 'dest': 'build/' }
        ]
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-wintersmith-compile');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Resgister task(s).
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['wintersmith_compile', 'copy']);
  grunt.registerTask('build', ['wintersmith_compile', 'uglify', 'cssmin', 'htmlmin', 'copy']);
};
