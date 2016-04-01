import Ember from "ember";

export default Ember.Route.extend({
  session: Ember.inject.service(),

  afterModel() {
    /*if (this.get("session").isAuthenticated) {
     this.transitionTo("home");
     }*/
  }
});
