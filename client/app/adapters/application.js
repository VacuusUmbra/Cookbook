import DS from "ember-data";
import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default DS.JSONAPIAdapter.extend({
  user: storageFor("user"),
  loadSaveResponse: true,

  namespace: "api/v1",
  authorizer: 'authorizer:ouath2',

  headers: Ember.computed('session.authToken', function() {
    return {
      'token': this.get("user.logintoken"),
      'username': this.get("user.currentUser.userName")
    };
  }),


  ajax(url, type, options) {
    console.log(url);
    console.log(options);
    return this._super(...arguments);
  }

});
