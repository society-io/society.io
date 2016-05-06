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
      tasks: ['jshint', 'concat', 'sass'],
    },
    concat: {
      dist: {
        src: ['public/app/app.module.js',
          'public/app/shared/**/*.js',
          'public/app/auth/**/*.js',
          'public/app/battlefield/**/*.js',
          'public/app/loading/**/*.js',
          'public/app/lobby/**/*.js',
          'public/app/ui-router/app.config.js'
        ],
        dest: 'public/dist/built.js',
      }
    },
    sass: {
      options: {
        sourceMap: true,
        sourceComments: false
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
