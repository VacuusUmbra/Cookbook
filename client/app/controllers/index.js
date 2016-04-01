import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations, {
    session: Ember.inject.service("session"),

    actions: {
        authenticate() {
            const { email, password } = this.getProperties("email", "password");
            return this.get("session").authenticate("authenticator:custom", email, password);
        }
    },

    email: null,
    password: null,
    rememberMe: false,
    validations: {
        email: {
            presence: true,
            format: {
                with: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            }
        },
        password: {
            presence: true,
            length: { minimum: 6, maximum: 10 }
        }
    }
});
