import Ember from "ember";
import EmberValidations from "ember-validations";
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend(EmberValidations, {
  session: Ember.inject.service(),

  user: storageFor("user"),

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

  doAuth: function (username, password) {
    console.log("Test");
    var url = "http://127.0.0.1:13337/api/v1/token";
    var data = {"username": username, "password": password};
    const options = {
      url,
      data,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded'
    };
    Ember.$.ajax(options).then((response) => {
      console.log(response);
      if (typeof response["token"] !== "undefined") {
        this.set("user.logintoken", response["token"]);
        this.set("user.isAuthenticated", true);
        this.set("user.currentUser", {
          "userName": response["userName"],
          "isAdmin": response["isAdmin"],
          "email": response["email"],
          "saved": response["savedrecipes"],
          "recipes": response["recipes"]
        });

        console.log(this.get("session"));
        this.set("loginModal", false);
        //this.transitionToRoute("home");
      }
    });
  },

  actions: {
    authenticate() {
      const {email, password} = this.getProperties("email", "password");
      this.doAuth(email, password);
    },

    openLoginModal() {
      this.set("loginModal", true);
    },

    openRegisterModal() {
      this.set("registerModal", true);
    },

    logout() {
      this.get("user").clear();
    }
  },

  email: null,
  password: null,
  rememberMe: false,
  validations: {
    email: {
      presence: true,
      length: {minimum: 5, maximum: 10}
    },
    password: {
      presence: true,
      length: {minimum: 5, maximum: 10}
    }
  }
});
