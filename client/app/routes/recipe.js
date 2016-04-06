import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    // Render default outlet
    this.render();
    // render extra outlets
    this.render("recipe-navbar", {
      outlet: "leftBar",
      into: "application"
    });
  },

  model: function(params) {
    return this.store.findRecord("recipe", params.recipe_id);
  }
});
