module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      src: 'src/datapage.js'
    },
    uglify: {
      min: {
        files: {
          'dest/datapage.min.js': ['src/datapage.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['jshint', 'uglify']);
};
