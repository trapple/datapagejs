module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: "dest/",
      src: "datapage.js",
      dest: "./",
      rename: function (dest, src) {
        return dest + 'index.js';
      }
    }]
  }
};
