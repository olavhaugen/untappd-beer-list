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

  Template.tap.helpers({
    beer: function (){
      return {name: 'Dahls'};
    }
  });
  Template.tap.events({
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log(Taps.find().count());
    if (Taps.find().count() === 0) {
      for (var i = 1; i <= 5; i++) {
        Taps.insert({num: i, beer: null});
      }
    }
  });
}
