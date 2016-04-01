import DS from "ember-data";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";

export default DS.JSONAPIAdapter.extend({
    namespace: "api/v1",
    authorizer: 'authorizer:ouath2'
});
