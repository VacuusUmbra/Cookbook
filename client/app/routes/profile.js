import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    // Render default outlet
    this.render();
    // render extra outlets
    this.render("profile-navbar", {
      outlet: "leftBar",
      into: "application"
    });
  }
});
