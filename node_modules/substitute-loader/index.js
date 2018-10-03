/**
*  Substitute loader for [webpack](https://webpack.github.io/)
* @description: Replaces the content of a file.
* @author "Martin Krause <npm@mkrause.info> (http://martinkr.github.io)"
* @license MIT
*/

/* eslint-env node */

var loaderUtils = require("loader-utils");

module.exports = function () {
	var _query = loaderUtils.parseQuery(this.query);

	// mark loader as as cacheable
	this.cacheable();

	if (_query && _query.content) {
		return JSON.stringify(_query.content);
	}
	return null;
};
