module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['public/app/**/*.js', 'server/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['public/styles/**/*.scss', 'public/app/**/*.js', 'server/**/*.js'],
      tasks: ['jshint', 'concat', 'sass']
      // tasks: ['sass']
    },
    concat: {
      dist: {
        src: [
          'public/app/app.module.js',
          'public/app/app.controller.js',
          
          'public/app/auth/**/*.factory.js',
          'public/app/auth/**/*.controller.js',

          'public/app/shared/**/*.factory.js',
          'public/app/shared/**/*.controller.js',

          'public/app/battlefield/**/*.factory.js',
          'public/app/battlefield/**/*.controller.js',

          'public/app/loading/**/*.factory.js',
          'public/app/loading/**/*.controller.js',

          'public/app/lobby/**/*.factory.js',
          'public/app/lobby/**/*.controller.js',

          'public/app/waiting/**/*.factory.js',
          'public/app/waiting/**/*.controller.js',
          
          'public/app/ui-router/app.config.js'
        ],
        dest: 'public/dist/built.js',
      }
    },
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'public/dist/style.css': 'public/styles/style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['jshint', 'concat']);
};

