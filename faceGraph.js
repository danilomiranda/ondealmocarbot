var graph = require('fbgraph');
var util = require('./util.js');
var token = 'EAACEdEose0cBAFPHZBZCgLzIGhFwAtBIqTAgSTqdrm0FZAPWjWsZA5wuXTwwtVoq6wpbz3wdfBioJyB1OG4xk4VimspPcbDpfQl0Sjzqu8bzrbZAeBbp4maZAbI7wscYBJUbG2MFvgDrkqO0A4eEinypNuV0TXntrF6bGZAQHUolwZDZD';
graph.setAccessToken(token);

exports.search = function (text) {
  var searchOptions = {
    q:     text,
    type: "page",
    center: "-12.8892120,-38.3121390",
    distance: 600
  };

  var resp = null;
  graph.search(searchOptions, function(err, res) {
    var place = res.data;
    util.shuffle(place);
    place.some(function(item) {
      resp = item;
      return true;
    });
    return resp;
  });
}

exports.getPage = function(pageId) {
  graph.get("pageId?fields=name,phone", function(err, res) {
    return res;
  });
}
