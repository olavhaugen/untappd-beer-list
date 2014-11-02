var untappd = (function () {
  var clientId = 'F96DBE045AC0A7578D404A1052C754CFE50CA477';
  var clientSecret = 'F8C47F019AAEB8E96528AD1D1C22EB4C900E12E8';
  var authenticationUrlBase = 'https://untappd.com/oauth/authenticate/'
  var apiUrlBase = 'https://api.untappd.com/v4'
  var clientUrl = 'http://localhost:8080'
  var accessToken = null;

  function authenticate() {
    var url = authenticationUrlBase
      + '?client_id=' + clientId + '&'
      + 'response_type=token' + '&'
      + 'redirect_url=' + clientUrl;

    window.location.replace(url);
  }

  function getAccessToken(){
    var loc = window.location.href;
    var params = loc.split('#access_token=');
    if (params.length > 1) {
// TODO: Remove hash from url
      return params[1];
    }
  }

  function search() {

  }

  function getRecentCheckins() {
// /user/checkins/USERNAME
    var url = apiUrlBase + '/user/checkins?access_token=' + accessToken;
    return promise.get(url);
  }

  accessToken = getAccessToken();
  if (accessToken) {
    console.log('Untappd authenticated with token: ' + accessToken);
    console.log('Fetching list of recent checkins... hang on!');
    getRecentCheckins().then(function (error, data){
      var json = JSON.parse(data);
      console.log(json);
    });
  }
  else {
    console.log('Untappd is not authenticated');
  }

  return {
    authenticate: authenticate,
    isAuthenticated: function () {
      return !!accessToken;
    },
    getRecentCheckins: getRecentCheckins,
    search: search
  };
})();
