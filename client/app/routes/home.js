import Ember from "ember";

export default Ember.Route.extend({
  queryParams: {
    searchTerms: {
      refreshModel: true
    }
  },

  renderTemplate: function () {
    // Render default outlet
    this.render();
    // render extra outlets
    this.render("home-navbar", {
      outlet: "leftBar",
      into: "application"
    });
  },

  model: function (params) {
    //this.currentModel.reload();
    return this.store.query("recipe", {filter: {tags: params}});
  }
});
