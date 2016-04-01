export default function() {
	this.get("api/v1/recipes", function() {
		return {
			data: [
					{id: 1, type: "recipe", attributes: {
            recipeid: 1, name: "test", author: "admin", tags: ["test1", "test2"], image: "http://placehold.it/250x150", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}},
					{id: 2, type: "recipe", attributes: {
            recipeid: 2, name: "test", author: "admin", image: "http://placehold.it/250x150", tags: ["test3", "test4"], body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}},
					{id: 3, type: "recipe", attributes: {
            recipeid: 3, name: "test", author: "admin", image: "http://placehold.it/250x150", tags: ["test5", "test6"], body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}},
					{id: 4, type: "recipe", attributes: {
            recipeid: 4, name: "test", author: "admin", image: "http://placehold.it/250x150", tags: ["test5", "test6"], body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}},
					{id: 5, type: "recipe", attributes: {
            recipeid: 5, name: "test", author: "admin", image: "http://placehold.it/250x150", tags: ["test1", "test5"], body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}},
					{id: 6, type: "recipe", attributes: {
            recipeid: 6, name: "test", author: "admin", image: "http://placehold.it/250x150", tags: ["test4", "test2"], body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
					}}
				]
		};
	});

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
