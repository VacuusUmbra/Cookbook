import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    newComment() {
      // do server stuff
      var newComment = this.store.createRecord("comment");
      newComment.set("body", this.get("editor").getValue());
      newComment.set("author", "test");
      newComment.set("recipeid", 1);
      newComment.save();
      this.set("comments", newComment);

      console.log(this.get("editor").getValue());
    },

    clearText() {
      this.get("editor").setValue("");
    }
  }
});
