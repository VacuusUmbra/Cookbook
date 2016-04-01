import Ember from "ember";

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  hideLoginModal: function () {
    Ember.run.scheduleOnce("render", this, function () {
      this.set("loginModal", false);
      this.set("registerModal", false);
    });
  }.on("init"),

  fixLoginLink: function () {
    Ember.run.scheduleOnce("afterRender", this, function () {
      Ember.$("#loginButton").click(function (event) {
        event.preventDefault();
      });
    });
  }.on("init"),

  actions: {
    authWithFacebook() {
      this.get('session').authenticate('simple-auth-authenticator:torii', 'facebook-oauth2');
    },

    openLoginModal() {
      this.set("loginModal", true);
    },
    
    openRegisterModal() {
      this.set("registerModal", true);
    }
  }
});
