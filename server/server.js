var express = require("express"),
    app = express(),
    mysql = require("mysql"),
    bodyParser = require("body-parser"),
    _ = require("underscore"),
    oauthserver = require("oauth2-server");

// TODO: Get the actual database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cookbookdb"
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//app.use(express.static("../client/dist/"));

app.oauth = oauthserver({
    model: require('./model'),
    grants: ["password"],
    debug: true
});

// Handle token grant requests
app.all("/api/v1/token", app.oauth.grant());

// Show them the "do you authorise xyz app to access your content?" page
app.get("/api/v1/authorise", function(req, res, next) {
    console.log(JSON.stringify(req.body));    
    if (!req.session.user) {
        // If they aren"t logged in, send them to your own login implementation
        return res.redirect("/login?redirect=" + req.path + "&client_id=" +
            req.query.client_id + "&redirect_uri=" + req.query.redirect_uri);
    }

    // TODO: make the authorize page

    res.render("authorise", {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});

// Handle authorise
app.post("/api/v1/authorise", function(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login?client_id=" + req.query.client_id +
            "&redirect_uri=" + req.query.redirect_uri);
    }

    next();
}, app.oauth.authCodeGrant(function(req, next) {
    // The first param should to indicate an error
    // The second param should a bool to indicate if the user did authorise the app
    // The third param should for the user/uid (only used for passing to saveAuthCode)
    next(null, req.body.allow === "yes", req.session.user.id, req.session.user);
}));

app.post("/login", function(req, res, next) {
    // Insert your own login mechanism
    console.log(JSON.stringify(req.body));
    if (req.body.email !== "thom@nightworld.com") {
        res.render("login", {
            redirect: req.body.redirect,
            client_id: req.body.clientId,
            redirect_uri: req.body.redirect_uri
        });
    } else {
        // Successful logins should send the user back to the /oauth/authorise
        // with the client_id and redirect_uri (you could store these in the session)
        return res.redirect((req.body.redirect || "/home") + "?client_id=" +
            req.body.client_id + "&redirect_uri=" + req.body.redirect_uri);
    }
});

app.get("/api/v1/recipes/", function(req, res) {
    // search database tags with query
    // req.query.filter.tags.searchTerms.split(" ") will return an array of searchTerms

    // Test
    if (req.query.filter !== undefined) {
        var searchTerms = req.query.filter.tags.searchTerms.split(" ");
        if (searchTerms.length !== 0 && _(searchTerms).difference([""]).length !== 0) {
            connection.query("SELECT id, tags, name FROM recipes WHERE(tags LIKE ? OR name LIKE ?)", [searchTerms, searchTerms], function(err, rows) {
                console.log(err);
                if (!err) {
                    var result = { data: [] };
                    for (var r in rows) {
                        result.data[r] = {
                            id: rows[r].id,
                            type: "recipe",
                            attributes: {
                                name: rows[r].name,
                                author: rows[r].author,
                                tags: rows[r].tags
                            }
                        }
                    }

                    res.send(result);
                }
            });

        } else {
            // send everything since there is no search term
            connection.query("SELECT * FROM recipes", function(err, rows) {
                console.log(err);
                if (!err) {
                    var result = { data: [] };
                    for (var r in rows) {
                        result.data[r] = {
                            id: rows[r].id,
                            type: "recipe",
                            attributes: {
                                name: rows[r].name,
                                author: rows[r].author,
                                tags: rows[r].tags
                            }
                        }
                    }
                    res.send(result);
                }
            });
        }
    } else {
        // send everything
        connection.query("SELECT * FROM recipes", function(err, rows) {
            console.log(err);
            if (!err) {
                var result = { data: [] };
                for (var r in rows) {
                    result.data[r] = {
                        id: rows[r].id,
                        type: "recipe",
                        attributes: {
                            name: rows[r].name,
                            author: rows[r].author,
                            tags: rows[r].tags
                        }
                    }
                }
                res.send(result);
            }
        });
    }
});

var port = 13337;

var server = app.listen(port, function() {
    console.log("[WEB] listening on %s", port);
});

app.set("server", server);
