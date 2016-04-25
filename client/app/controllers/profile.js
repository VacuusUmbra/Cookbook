import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  user: storageFor("user"),

  setAdminPrivileges: function () {
    Ember.run.scheduleOnce("render", this, function () {
      this.set("admin", true);
    });
  }.on("init")
});
