module.exports = {
  "dev": {
    src: [
      "src/datapage.js"
    ],
    dest: "dest/datapage.js",
    nonull: true,
  },
  options: {
    stripBanners: true,
    banner: ['/*', 
             ' * <%= package.name %>',
             ' * <%= package.description %>',
             ' * <%= package.repository.url %>',
             ' * Copyright 2013 <%= package.author %>',
             ' * Version: <%= package.version %>',
             ' */'].join("\n")
  }
};
