var currentTap = null;
AutoComplete = new Mongo.Collection();
Taps = new Mongo.Collection('taps');

if (Meteor.isClient) {
  var untappd = new Untappd();
  untappd.authenticate();

  Template.body.helpers({
    taps: function () {
      return Taps.find({}, {sort: {num: 1}});
    }
  });

  Template.body.events({
    'click .delete': function () {
      Beers.remove(this._id);
    }
  })

  Template.tap.events({
    'keyup .search': function(event){
      untappd.search(event.target.value)
        .then(function(results){
          results.items.forEach(function(res){
            AutoComplete.insert(res);
          });
        })
      currentTap = this;
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

  Template.autocompleteSearch.helpers({
    autocomplete: function (){
      return AutoComplete.find();
    }
  });

  Template.autocompleteSearch.events({
    'click a': function (event){
      var bid = this.beer.bid;
      untappd.beerInfo(bid)
        .then(function (beer){
          Taps.update({
            _id: currentTap._id
          }, {$set: {
            beer: beer
          }});

          currentTap = null;
        })

      AutoComplete.remove({});
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
