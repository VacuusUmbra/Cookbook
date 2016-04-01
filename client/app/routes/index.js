import Ember from "ember";

export default Ember.Route.extend({
    session: Ember.inject.service(),

    afterModel() {
        /*if (this.get("session").isAuthenticated) {
            this.transitionTo("home");
        }*/
    },

    renderTemplate: function() {
        // Render default outlet   
        this.render();
        // render extra outlets
        this.render("menu", {
            outlet: "menu",
            into: "application" // important when using at root level
        });
    },
});
