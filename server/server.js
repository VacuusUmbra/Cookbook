var express = require("express"),
    app = express(),
    mysql = require("mysql"),
    bodyParser = require("body-parser"),
    _ = require("underscore"),
    japi = require("./jsonapi.js"),
    busboy = require('connect-busboy');

// default options, no immediate parsing
app.use(busboy({immediate: true}));

oauthserver = require("oauth2-server");

// TODO: Get the actual database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Justin343!",
    database: "cookbookdb"
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.static("../client/dist/"));

app.post("/api/v1/token/", function (req, res) {
    connection.query("SELECT token.token, token.userName, users.isAdmin, users.userEmail, users.userPass, " +
        "(SELECT group_concat(savedrecipes.srID SEPARATOR ', ') FROM savedrecipes WHERE savedrecipes.savedByUser = ?) AS saved, " +
        "(SELECT group_concat(recipe.rName SEPARATOR ', ') FROM recipe WHERE recipe.creatorName = ?) AS recipeNames, " +
        "(SELECT group_concat(recipe.recipeID SEPARATOR ', ') FROM recipe WHERE recipe.creatorName = ?) AS recipeIDs " +
        "FROM token JOIN users ON token.userName = users.userName WHERE token.userName = ?",
        [req.body.username, req.body.username, req.body.username, req.body.username], function (err, rows) {
            if (err) {
                console.log(err);
            }
            if (rows[0]["userPass"] == req.body["password"]) {
                var admin;
                if (rows[0].isAdmin == "N" || rows[0].isAdmin == "No") {
                    admin = false;
                }
                else {
                    admin = true;
                }

                var response = {
                    "token": rows[0]["token"],
                    "userName": rows[0]["userName"],
                    "email": rows[0]["userEmail"],
                    "savedrecipes": [],
                    "recipes": [],
                    "isAdmin": admin
                };

                var saved = rows[0]["saved"].split(", ");
                var recipeNames = rows[0]["recipeNames"].split(", ");
                var recipeIDs = rows[0]["recipeIDs"].split(", ");

                for (var i in saved) {
                    response["savedrecipes"].push(saved[i]);
                }
                for (var i in recipeNames) {
                    response["recipes"].push({"name": recipeNames[i], "id": recipeIDs[i]});
                }

                res.send(response);
            }
        });
});

app.get("/api/v1/users/:username/", function (req, res) {
    console.log("test");
    connection.query("SELECT users.userName, users.isAdmin, " +
        "(SELECT group_concat(savedrecipes.srID SEPARATOR ', ') FROM savedrecipes WHERE savedrecipes.savedByUser = ?) AS saved, " +
        "(SELECT group_concat(recipe.rName SEPARATOR ', ') FROM recipe WHERE recipe.creatorName = ?) AS recipeNames, " +
        "(SELECT group_concat(recipe.recipeID SEPARATOR ', ') FROM recipe WHERE recipe.creatorName = ?) AS recipeIDs " +
        "FROM users WHERE users.userName = ?", [req.params.username, req.params.username, req.params.username, req.params.username], function (err, rows) {

        var jres = new japi.JSONAPIResponse();
        jres.setId("1");
        jres.setType("user");

        var admin;
        if (rows[0].isAdmin == "N" || rows[0].isAdmin == "No") {
            admin = false;
        }
        else {
            admin = true;
        }

        var saved = rows[0]["saved"].split(", ");
        var recipeNames = rows[0]["recipeNames"].split(", ");
        var recipeIDs = rows[0]["recipeIDs"].split(", ");

        var _saved = [];
        var _recipeNames = [];

        for (var i in saved) {
            _saved.push(saved[i]);
        }
        for (var i in recipeNames) {
            _recipeNames.push({"name": recipeNames[i], "id": recipeIDs[i]});
        }

        var response = {
            "data": {
                "id": 1,
                "type": "user",
                "attributes": {
                    "username": rows[0]["userName"],
                    "isAdmin": admin,
                    "savedrecipes": _saved,
                    "recipes": _recipeNames
                }
            }
        };

        jres.addAttribute({"username": rows[0]["userName"]});
        jres.addAttribute({"isAdmin": admin});
        jres.addAttribute({"savedrecipes": _saved});
        jres.addAttribute({"recipes": _recipeNames});

        res.send(response);
    });
});

app.get("/recipe/:id/comments/", function (req, res) {
    console.log(req.params.id);
    connection.query("SELECT comments.cAuthor, comments.cID, comments.rID, comments.content " +
        "FROM comments WHERE comments.rID = ?", [req.params.id], function (err, rows) {
        var response = {
            "data": []
        };

        if (err) {
            console.log(err);
            res.send(response);
        }
        else {
            for (var row in rows) {
                response["data"].push({
                    "id": rows[row]["cID"],
                    "type": "comment",
                    "attributes": {
                        "author": rows[row]["cAuthor"],
                        "body": rows[row]["content"],
                        "recipeid": req.params.id
                    }
                });
            }
            res.send(response);
        }
    });
});

app.post("/api/v1/comments", function (req, res) {

});

// Recipe query
app.get("/api/v1/recipes/:id/", function (req, res) {
    console.log(req.params.id);
    connection.query("SELECT recipe.rName, recipe.recipeID, recipe.prepTime, recipe.cookTime, recipe.recipeRating," +
        " recipe.creatorName, recipe.directions, recipe.ingredients, (SELECT group_concat(recipetags.tagName SEPARATOR ', ')" +
        " FROM recipetags WHERE recipetags.recipeID = recipe.recipeID) AS tags FROM recipe WHERE recipe.recipeID = 1",
        [req.params.id], function (err, rows) {
            //console.log(JSON.stringify(rows));
            var jres = new japi.JSONAPIResponse({hasRelationships: true});
            var comments = new japi.JSONAPIRelationship("comments");
            if (err) {
                console.log(err);
            } else {
                var response = {
                    "data": {
                        "id": 1,
                        "type": "recipes",
                        "attributes": {
                            "author": rows[0]["creatorName"],
                            "body": rows[0]["directions"],
                            "cooktime": rows[0]["cookTime"],
                            "name": rows[0]["rName"],
                            "preptime": rows[0]["prepTime"],
                            "recipeid": rows[0]["recipeID"],
                            "tags": rows[0]["tags"]
                        },
                        "relationships": {
                            "comments": {
                                "data": []
                            }
                        }
                    }
                };
                /*jres.addAttribute({"author": rows[0]["creatorName"]});
                 jres.addAttribute({"body": rows[0]["directions"]});
                 jres.addAttribute({"cooktime": rows[0]["cookTime"]});
                 //jres.addAttribute({"image":rows[0]["creatorName"]});
                 jres.addAttribute({"name": rows[0]["rName"]});
                 jres.addAttribute({"preptime": rows[0]["prepTime"]});
                 jres.addAttribute({"recipeid": rows[0]["recipeID"]});
                 jres.addAttribute({"tags": rows[0]["tags"]});

                 jres.setId(req.params.id);
                 jres.setType("recipe");
                 jres.addRelationship(comments.toJson());*/

                res.send(response);
            }
        });
});

app.post("/api/v1/recipes/", function (req, res) {
    //console.log(req.body);
    console.log("Token:" + req.get("token"));
    connection.query("SELECT * FROM token WHERE userName = ?", [req.get("username")], function (err, rows) {
        if (err) {
            console.log(err);
        }
        if (rows[0]["token"] == req.get("token")) {
            var recipe = req.body.data;
            //onsole.log(recipe);
            /*var sql = "CALL new_recipe('"+ recipe.attributes.name + "', '" +
             recipe.attributes.preptime + "', '" +
             recipe.attributes.cooktime + "', '"+
             recipe.attributes.ingredients + "', '" +
             recipe.attributes.body + "', '" +
             req.get("username") + "')";
             console.log(sql);*/
            connection.query("CALL new_recipe(?, ?, ?, ?, ?, ?)", [recipe.attributes.name, recipe.attributes.preptime,
                recipe.attributes.cooktime, recipe.attributes.ingredients, recipe.attributes.body, req.get("username")], function (err, rows) {
                if (err) {
                    console.log(err);
                }
                else {
                    connection.query("SELECT recipe.recipeID, recipe.rName FROM recipe WHERE recipe.rName = ?", [recipe.attributes.name], function (err, rows) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var rid = rows[0]["recipeID"];
                            var tags = recipe.attributes.tags.split(",");
                            for (var t in tags) {
                                connection.query("INSERT INTO recipetags VALUES(?, ?)", [rid, tags[t]], function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        }
                    });

                    connection.query("SELECT recipe.rName, recipe.directions, recipe.creatorName, recipe.recipeID, " +
                        "(SELECT group_concat(recipetags.tagName SEPARATOR ', ') FROM recipetags WHERE recipetags.recipeID = recipe.recipeID) AS tags " +
                        "FROM recipe WHERE recipe.rName = ?", [recipe.attributes.name], function (err, rows) {
                        if (err) {
                            console.log(err);
                        }
                        var response = {
                            "data": []
                        };

                        for (var i in rows) {
                            response["data"].push({
                                "id": rows[i]["recipeID"],
                                "type": "recipe",
                                "attributes": {
                                    "author": rows[i]["creatorName"],
                                    "recipeid": rows[i]["recipeID"],
                                    "body": rows[i]["directions"],
                                    "name": rows[i]["rName"],
                                    "tags": rows[i]["tags"]
                                }
                            });
                        }
                        res.send(response);
                    });
                }
            });
        }
    });
});

app.get("/api/v1/recipes", function (req, res) {
    // search database tags with query
    // req.query.filter.tags.searchTerms.split(" ") will return an array of searchTerms

    // Test
    if (req.query.filter !== undefined) {
        var searchTerms = req.query.filter.tags.searchTerms.split(" ");
        if (searchTerms.length !== 0 && _(searchTerms).difference([""]).length !== 0) {
            connection.query("SELECT * FROM (SELECT recipe.rName, recipe.directions, recipe.creatorName, recipe.recipeID, " +
                "(SELECT group_concat(recipetags.tagName SEPARATOR ', ') FROM recipetags WHERE recipetags.recipeID = recipe.recipeID) AS tags FROM recipe) " +
                "AS lol WHERE (lol.tags LIKE" + connection.escape('%' + searchTerms + '%') + "OR lol.rName LIKE" + connection.escape('%' + searchTerms + '%') + ")", [], function (err, rows) {
                if (err) {
                    console.log(err);
                }

                var response = {
                    "data": []
                };

                for (var i in rows) {
                    /*jres = new japi.JSONAPIResponse();

                     jres.setId(rows[i]["recipeID"]);
                     jres.setType("recipe");

                     jres.addAttribute({"author": rows[i]["creatorName"]});
                     jres.addAttribute({"recipeid": rows[i]["recipeID"]});
                     jres.addAttribute({"body": rows[i]["directions"]});
                     jres.addAttribute({"name": rows[i]["rName"]});
                     jres.addAttribute({"tags": rows[i]["tags"]});

                     response["data"].push(jres.toJson());*/
                    response["data"].push({
                        "id": rows[i]["recipeID"],
                        "type": "recipe",
                        "attributes": {
                            "author": rows[i]["creatorName"],
                            "recipeid": rows[i]["recipeID"],
                            "body": rows[i]["directions"],
                            "name": rows[i]["rName"],
                            "tags": rows[i]["tags"]
                        }
                    });
                }

                res.send(response);
            });
            /*connection.query("SELECT id, tags, name FROM recipes WHERE(tags LIKE ? OR name LIKE ?)", [searchTerms, searchTerms], function (err, rows) {
             console.log(err);
             if (!err) {
             var result = {data: []};
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
             });*/
        } else {
            // send everything since there is no search term
            connection.query("SELECT recipe.rName, recipe.directions, recipe.creatorName, recipe.recipeID, " +
                "(SELECT group_concat(recipetags.tagName SEPARATOR ', ') FROM recipetags WHERE recipetags.recipeID = recipe.recipeID) AS tags " +
                "FROM recipe", [searchTerms], function (err, rows) {
                if (err) {
                    console.log(err);
                }

                var response = {
                    "data": []
                };
                for (var i in rows) {
                    response["data"].push({
                        "id": rows[i]["recipeID"],
                        "type": "recipe",
                        "attributes": {
                            "author": rows[i]["creatorName"],
                            "recipeid": rows[i]["recipeID"],
                            "body": rows[i]["directions"],
                            "name": rows[i]["rName"],
                            "tags": rows[i]["tags"]
                        }
                    });
                }
                res.send(response);
            });

            /*connection.query("SELECT * FROM recipes", function (err, rows) {
             console.log(err);
             if (!err) {
             var result = {data: []};
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
             });*/
        }
    } else {
        // send everything
        connection.query("SELECT recipe.rName, recipe.directions, recipe.creatorName, recipe.recipeID, " +
            "(SELECT group_concat(recipetags.tagName SEPARATOR ', ') FROM recipetags WHERE recipetags.recipeID = recipe.recipeID) AS tags " +
            "FROM recipe", [searchTerms], function (err, rows) {
            if (err) {
                console.log(err);
            }

            var response = {
                "data": []
            };

            for (var i in rows) {
                response["data"].push({
                    "id": rows[i]["recipeID"],
                    "type": "recipe",
                    "attributes": {
                        "author": rows[i]["creatorName"],
                        "recipeid": rows[i]["recipeID"],
                        "body": rows[i]["directions"],
                        "name": rows[i]["rName"],
                        "tags": rows[i]["tags"]
                    }
                });
            }
            res.send(response);
        });

        /*connection.query("SELECT * FROM recipes", function (err, rows) {
         console.log(err);
         if (!err) {
         var result = {data: []};
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
         });*/
    }
});

var port = 13337;

var server = app.listen(port, function () {
    console.log("[WEB] listening on %s", port);
});

app.set("server", server);
