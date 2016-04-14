import Ember from 'ember';

export default Ember.Controller.extend({
  setAdminPrivileges: function () {
    Ember.run.scheduleOnce("render", this, function () {
      this.set("admin", true);
    });
  }.on("init")
});
