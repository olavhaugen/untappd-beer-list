var currentTap = null;
AutoComplete = new Mongo.Collection();
Taps = new Mongo.Collection('taps');

if (Meteor.isClient) {
  var untappd = new Untappd();
  untappd.authenticate();

  Template.body.helpers({
    taps: function () {
      return Taps.find();
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

  Template.findBeer.helpers({
    autocomplete: function (){
      return AutoComplete.find();
    }
  });

  Template.findBeer.events({
    'click a': function (event){
      Taps.update({
        _id: currentTap._id
      }, {$set: {
        beer: this.beer
      }});

      AutoComplete.remove({});
      currentTap = null;
      event.target.value = '';
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
