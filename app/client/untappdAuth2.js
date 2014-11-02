(function (scope){
  //var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)untappdCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  var UntappdAuth = function () {
    var clientId = 'F96DBE045AC0A7578D404A1052C754CFE50CA477';
    var authenticationUrlBase = 'https://untappd.com/oauth/authenticate/'
    var clientUrl = 'http://localhost:3000'

    function getAccessToken(){
      var loc = window.location.href;
      var params = loc.split('#access_token=');
      if (params.length > 1) {
        // TODO: Remove hash from url
        return params[1];
      }
    }

    var accessToken = getAccessToken();
    if (accessToken) {
      console.log('Untappd authenticated with token: ' + accessToken);
    }
    else {
      console.log('Untappd is not authenticated');
    }

    UntappdAuth.prototype.authenticate = function() {
      if (accessToken) {
        return accessToken;
      }
      var url = authenticationUrlBase
        + '?client_id=' + clientId + '&'
        + 'response_type=token' + '&'
        + 'redirect_url=' + clientUrl;

      window.location.replace(url);
    };
  };
  scope.UntappdAuth = UntappdAuth
}(this));
