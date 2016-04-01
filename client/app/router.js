import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("home");
  this.route("about");
  this.route('menu');
  this.route('profile');
  this.route('recipe');
});

export default Router;
