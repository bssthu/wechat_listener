#!/usr/bin/env node
// -*- coding:utf-8 -*-
// File          : server.js
// Author        : bss
// Project       : wechat_listener
// Creation Date : 2015-11-04
// Description   : https://github.com/bssthu/wechat_listener
// 

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var crypto = require('crypto');

var config = require('./config');


var server = http.createServer(function wechatReceiver(request, response) {
  var query = querystring.parse(url.parse(request.url).query)

  var arr = [ config.token, query.timestamp, query.nonce ];
  var cryptoSrc = arr.sort().join('')
  var sha1 = crypto.createHash('sha1');
  var signature = sha1.update(cryptoSrc).digest('hex');

  if (query.signature === signature) {
    response.write(query.echostr);
  }
  response.end();
}).listen(config.httpPort);
