import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({
  user: storageFor("user"),

  renderTemplate: function () {
    // Render default outlet
    this.render();
    // render extra outlets
    this.render("profile-navbar", {
      outlet: "leftBar",
      into: "application"
    });
  },

  model: function(params) {
    console.log(this.get("user.currentUser.userName"));
    return this.store.findRecord("user", this.get("user.currentUser.userName"), { reload: true });
  }

});
