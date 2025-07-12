// CommonJS compatibility wrapper
// Loads the rollup-generated CommonJS build and provides multiple export patterns

const DataPageClass = require('./dist/datapage.cjs');

// Support all CommonJS import patterns:
// 1. const DataPage = require("datapage")
// 2. const { DataPage } = require("datapage") 
// 3. const DataPage = require("datapage").default

module.exports = DataPageClass;
module.exports.DataPage = DataPageClass;
module.exports.default = DataPageClass;