import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ["searchTerms"],
  searchTerms: "",

  hideModal: function () {
    Ember.run.scheduleOnce("render", this, function () {
      this.set("openNewRecipeModal", false);
    });
  }.on("init"),

  taggify: function () {
    Ember.run.scheduleOnce("afterRender", this, function () {
      Ember.$("#ingredients").tagsManager({
        prefilled: ["Pizza", "Italian"],
        CapitalizeFirstLetter: true
      });
    });
  }.on("init"),

  actions: {
    search() {
      console.log(this.getProperties("searchTerms"));
    },

    createRecipeModal() {
      this.set("createRecipeModal", true);
      this.set("openNewRecipeModal", true);
    },

    hideCreateRecipeModal() {
      this.set("openNewRecipeModal", false);
    },

    submitModal() {
      console.log(Ember.$("#ingredients").tagsManager('tags'));
      this.set("openNewRecipeModal", false);

      console.log("Submitting modal");
    },

    test() {
      console.log("Test");
    }
  }
});
