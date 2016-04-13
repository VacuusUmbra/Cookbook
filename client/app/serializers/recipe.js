import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindAllResponse(store, type, payload) {
    payload.data = payload.data.map(this.addLinks);
    return payload;
  },

  normalizeFindRecordResponse(store, type, payload) {
    payload.data = this.addLinks(payload.data);
    return payload;
  },

  addLinks(recipe) {
    delete recipe.relationships.comments.data;
    recipe.relationships.comments.links = {
      related: `/recipe/${recipe.id}/comments`
    };
    return recipe;
  }

});

