var currentTap = null;
AutoComplete = new Mongo.Collection();
Taps = new Mongo.Collection('taps');

if (Meteor.isClient) {
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
      currentTap = this;
      AutoComplete.insert({id: 3, name: 'hello ' + event.target.value});
      AutoComplete.insert({id: 4, name: 'hello ' + event.target.value});
      AutoComplete.insert({id: 1, name: 'hello ' + event.target.value});
      AutoComplete.insert({id: 5, name: 'hello ' + event.target.value});
    },
    'submit .new-beer': function (event) {
      console.log(this);
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
      var beerId = event.target.getAttribute('data-id'),
        beer = AutoComplete.findOne({id: parseInt(beerId)});
      Taps.update({
        _id: currentTap._id
      }, {$set: {
        beer: beer
      }});
      AutoComplete.remove({});
      currentTap = null;
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
