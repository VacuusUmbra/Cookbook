/*
* "Library" to construct well formed JSONAPI responses that the Ember client will expect.
* There are some tests at the bottom of the file, which also show an example of how to use the
* library to construct a response with relationships
*/


/*
    Useful for checking the tests
    var prettyjson = require("prettyjson");
 */

function isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

class JSONAPIRelationship {
    constructor(name) {
        this.name = name;

        this.body = {};
        this.body[this.name] = {data: []};
    }

    addData(data) {
        this.body[this.name].data.push(data);
    }

    addLink(link) {
        if (typeof(this.body[this.name].links) === "undefined") {
            this.body[this.name].links = [];
        }
        this.body[this.name].links.push(link);
    }

    toJson() {
        return this.body;
    }
}

class JSONAPIResponse {
    constructor(options) {
        if (typeof(options) === "undefined") {
            this.hasLinks = false;
            this.hasRelationships = false;
        }
        else {
            this.hasLinks = false;
            this.hasRelationships = false;

            if (typeof (options.hasLinks) !== "undefined") {
                this.hasLinks = options.hasLinks;
            }
            if (typeof (options.hasRelationships) !== "undefined") {
                this.hasRelationships = options.hasRelationships;
            }
        }

        this.body = {};

        this.data = [{
            "attributes": {},
            "type": "",
            "id": ""
        }];

        this.attributes = {};

        this.id = "";

        this.type = "";

        // "Root" links entry
        if (this.hasLinks === true) {
            this.body.links = {};
        }

        if (this.hasRelationships === true) {
            this.relationships = {};
        }
    }

    // Set the type
    setType(type) {
        this.type = type;
    }

    // Set the id
    setId(id) {
        this.id = id;
    }

    // Add a new relationship with name := name
    addRelationship(relationship) {
        this.relationships = Object.assign(this.relationships, relationship);
    }

    // Add attribute
    addAttribute(attribute) {
        for (var key of Object.keys(attribute)) {
            this.attributes[key] = attribute[key];
        }
    }

    // Formats the JSONAPIClass into a JSONAPI format
    toJson() {
        this.data[0].relationships = this.relationships;
        this.data[0].attributes = this.attributes;
        this.data[0].type = this.type;
        this.data[0].id = this.id;
        this.body.data = this.data;
        var out = Object.assign({}, this.body);
        // Any extra transformations should use the out variable, since its a copy

        return out;
    }
}

var exports = module.exports = {};

exports.JSONAPIRelationship = JSONAPIRelationship;
exports.JSONAPIResponse = JSONAPIResponse;

// Example usage / tests
/*var japi = new JSONAPIResponse({hasRelationships: true});
var jrel = new JSONAPIRelationship("test");
var jrel2 = new JSONAPIRelationship("test2");

jrel.addData({id: 1});

japi.addRelationship(jrel.toJson());
japi.addRelationship(jrel2.toJson());

japi.addAttribute({"memes": "true"});

japi.setId("1");
japi.setType("recipe");

var test = japi.toJson();

console.log(JSON.stringify(test));
//console.log(prettyjson.render(test));*/