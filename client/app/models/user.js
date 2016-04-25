import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr("string"),
  savedrecipes: DS.attr(),
  recipes: DS.attr(),
  isAdmin: DS.attr()
});
