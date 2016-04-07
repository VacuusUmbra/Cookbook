import DS from 'ember-data';

export default DS.Model.extend({
  recipe: DS.belongsTo("recipe"),
  author: DS.attr(),
  body: DS.attr(),
  recipeid: DS.attr()
});
