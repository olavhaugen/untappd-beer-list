var Untappd = function () {
  var apiUrlBase = 'https://api.untappd.com/v4';
  var accessToken;

  Untappd.prototype.authenticate = function() {
    var authentication = new UntappdAuth();
    accessToken = authentication.authenticate();
  };

  Untappd.prototype.search = function(query) {
    var url = apiUrlBase + '/search/beer?q=' + query + 'access_token=' + accessToken;
    return promise.get(url);
  };

  Untappd.prototype.getRecentCheckins = function () {
    var url = apiUrlBase + '/user/checkins?access_token=' + accessToken;
    return promise.get(url);
  };

  return Untappd;
};