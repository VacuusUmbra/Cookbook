import Ember from "ember";

export default Ember.Route.extend({
    queryParams: {
        searchTerms: {
            refreshModel: true
        }
    },
    model: function(params) {
        return this.store.query("recipe", { filter: { tags: params } });
    }
});
