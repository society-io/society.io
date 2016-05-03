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
      files: ['public/app/**/*.js', 'server/**/*.js'],
      tasks: ['jshint', 'concat'],
    },
    concat: {
      dist: {
        src: ['public/app/app.module.js',
          'public/app/factories/**/*.js',
          'public/app/layout/**/*.js',
          'public/app/app.config.js'
        ],
        dest: 'public/dist/built.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat']);
};
