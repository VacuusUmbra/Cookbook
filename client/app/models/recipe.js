import DS from "ember-data";

export default DS.Model.extend({
  name: DS.attr(),
  author: DS.attr(),
  tags: DS.attr(),
  body: DS.attr(),
  image: DS.attr()
});
