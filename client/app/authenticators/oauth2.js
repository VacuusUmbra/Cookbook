import OAuth2PasswordGrant from "ember-simple-auth/authenticators/oauth2-password-grant";

export default OAuth2PasswordGrant.extend({
    serverTokenRevocationEndpoint: "api/v1/revoke",
    serverTokenEndpoint: "api/v1/token",
    clientId: "website"
});
