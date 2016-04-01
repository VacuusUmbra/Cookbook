import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),

  renderTemplate: function () {
    // Render default outlet
    this.render();
    // render extra outlets
    this.render("menu", {
      outlet: "rightBar",
      into: "application" // important when using at root level
    });
    this.render("application-navbar", {
      outlet: "leftBar",
      into: "application"
    });
  },

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    }
  }
});
