/**
 *
 * @module plugins
 * @description modules used in firekyll
 * @author Wilson Flores
 *
 */

var plugins = {
  cp       : require('child_process'),
  fs       : require('fs'), 
  path     : require('path'),
  symbols  : require('log-symbols'),
  chalk    : require('chalk'),
  program  : require('commander'),
  creator  : require('./creator'),
  messages : require('./messages')
};

module.exports = plugins;