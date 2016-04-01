import Ember from "ember";

export default Ember.Controller.extend({
    queryParams: ["searchTerms"],
    searchTerms: "",

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
          console.log("Submitting modal");
        }
      /*,

        openModal{

        }*/
    }
});
