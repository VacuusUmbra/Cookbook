import Ember from "ember";

export default Ember.Component.extend({
  click() {
    console.log("recipe clicked");
    this.sendAction("test");
  }
});
