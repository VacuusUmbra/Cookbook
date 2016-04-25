import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  author: DS.attr(),
  tags: DS.attr(),
  body: DS.attr(),
  image: DS.attr(),
  recipeid: DS.attr(),
  preptime: DS.attr(),
  cooktime: DS.attr(),
  ingredients: DS.attr(),
  comments: DS.hasMany("comment", {async:true})
});
