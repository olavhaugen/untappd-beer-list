(function (scope) {
  var Untappd = function () {
    var apiUrlBase = 'https://api.untappd.com/v4';
    var accessToken;

    Untappd.prototype.authenticate = function () {
      var authentication = new UntappdAuth();
      accessToken = authentication.authenticate();
    };

    Untappd.prototype.search = function (query) {
      var url = apiUrlBase + '/search/beer?q=' + query + '&access_token=' + accessToken;
      return jQuery.getJSON(url)
        .then(function(data){
          return data.response.beers;
        });
    };

    Untappd.prototype.beerInfo = function (bid) {
      var url = apiUrlBase + '/beer/info/'+bid+'?access_token=' + accessToken;
      return jQuery.getJSON(url)
        .then(function(data){
          console.log(data);
          return data.response.beer;
        });
    };

    Untappd.prototype.getRecentCheckins = function () {
      var url = apiUrlBase + '/user/checkins?access_token=' + accessToken;
      return jQuery.getJSON(url);
    };
  };

  scope.Untappd = Untappd;
}(this));
