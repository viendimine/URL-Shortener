const shortid = require("shortid");

const generateShortCode = (customAlias) => {
  return customAlias || shortid.generate();
};

module.exports = generateShortCode;
