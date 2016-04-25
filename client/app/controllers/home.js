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
        prefilled: ["Sauce", "Potato"],
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
      var recipeCount = this.get("model").get("length");

      console.log(Ember.$("#ingredients").tagsManager('tags'));
      console.log(this.get("editor").getValue());

      var ingredients = Ember.$("#ingredients").tagsManager('tags');
      var body = this.get("editor").getValue();
      const title = this.getProperties("recipeTitle");
      var preptime = Ember.$("#preptime").val() + " mins";
      var cooktime = Ember.$("#cooktime").val() + " mins";


      var tags = [];
      if (this.get("tag1")) {
        tags.push("pasta");
      }
      if (this.get("tag2")) {
        tags.push("chinese");
      }
      if (this.get("tag3")) {
        tags.push("french");
      }
      if (this.get("tag4")) {
        tags.push("test");
      }
      if (this.get("tag5")) {
        tags.push("pizza");
      }
      if (this.get("tag6")) {
        tags.push("salad");
      }

      var newRecipe = this.store.createRecord("recipe", {
        name: title["recipeTitle"],
        author: "",
        body: body,
        preptime: preptime,
        cooktime: cooktime,
        tags: tags.toString(),
        ingredients: ingredients.toString()
      });

      newRecipe.save();

      this.set("openNewRecipeModal", false);

      console.log(tags.toString());

      console.log("Submitting modal");
    },

    test() {
      console.log("Test");
    }
  }
});
