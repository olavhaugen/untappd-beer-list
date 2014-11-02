(function (scope) {
  var Untappd = function () {
    var apiUrlBase = 'https://api.untappd.com/v4';
    var accessToken;

    function addAccessToken(params) {
      params['access_token'] = accessToken;
      return params;
    }

    Untappd.prototype.authenticate = function () {
      var authentication = new UntappdAuth();
      accessToken = authentication.authenticate();
    };

    Untappd.prototype.search = function (query) {
      var url = apiUrlBase + '/search/beer';
      var params = addAccessToken({ q: query });
      return jQuery.getJSON(url, params)
        .then(function(data){
          return data.response.beers;
        });
    };

    Untappd.prototype.beerInfo = function (bid) {
      var url = apiUrlBase + '/beer/info/' + bid;
      var params = addAccessToken({});
      return jQuery.getJSON(url, params)
        .then(function(data){
          console.log(data);
          return data.response.beer;
        });
    };

    Untappd.prototype.getRecentCheckins = function () {
      var url = apiUrlBase + '/user/checkins';
      var params = addAccessToken({});
      return jQuery.getJSON(url, params);
    };
  };

  scope.Untappd = Untappd;
}(this));
