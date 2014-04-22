module.exports = function (grunt) {
  require('load-grunt-config')(grunt);

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("dev", ["jshint", "karma", "concat", "jsbeautifier"]);
  grunt.registerTask('dist', ['dev', 'uglify']);
};
