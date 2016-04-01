import Authenticator from "ember-simple-auth/authenticators/oauth2-password-grant";

export default Authenticator.extend({
    serverTokenRevocationEndpoint: "api/v1/revoke",
    serverTokenEndpoint: "api/v1/token",

    makeRequest: function(url, data) {
        data.client_id = "website";
        data.client_secret = "lol";
        return this._super(url, data);
    }
});
