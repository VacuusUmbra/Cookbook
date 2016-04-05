import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newComment() {
      // do server stuff
      console.log(this.get("editor").getValue());
    },

    clearText() {
      this.get("editor").setValue("");
    }
  }
});
