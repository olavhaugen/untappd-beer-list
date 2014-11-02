var currentTap = null;
Taps = new Mongo.Collection('taps');

if (Meteor.isClient) {
  var untappd = new Untappd();
  untappd.authenticate();

  Template.body.helpers({
    taps: function () {
      return Taps.find({}, {sort: {num: 1}}).map(function (tap) {
        var searchResults = new Mongo.Collection(null); 
        return {
          tap: tap,
          searchResults: searchResults,
          autocomplete: searchResults.find()
        }
      });
    }
  });

  Template.body.events({
    'click .delete': function () {
      Beers.remove(this._id);
    }
  })

  Template.tap.events({
    'keyup .search': function(event){
      var tapWrapper = this;
      tapWrapper.searchResults.remove({});
      if (!event.target.value) {
        return;
      }
      untappd.search(event.target.value).then(function(results){
          results.items.forEach(function (res) {
            tapWrapper.searchResults.insert(res);
          });
      });
      currentTap = tapWrapper.tap;
    },
    'submit .new-beer': function (event) {
      var name = event.target.name.value;
      Beers.insert({
        name: name,
        tapId: this.num,
        createdAt: new Date()
      });
      event.target.name.value = '';
      return false;
    }
  });

  Template.tap.events({
    'click a': function (event){
      var bid = this.beer.bid;
        untappd.beerInfo(bid).then(function (beer){
          Taps.update({
            _id: currentTap._id
          }, {$set: {
            beer: beer
          }});

          currentTap = null;
        });
      return false;
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Taps.find().count() === 0) {
      for (var i = 1; i <= 5; i++) {
        Taps.insert({num: i, beer: null});
      }
    }
  });
}
