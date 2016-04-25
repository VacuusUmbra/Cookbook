export default function () {
  //this.namespace = 'api/v1';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('api/v1/recipes');
  // this.post('/posts');
  this.get('api/v1/recipes/:id');
  // this.put('/posts/:id'); // or this.patch
  // this.del('/posts/:id');
  this.passthrough('http://127.0.0.1:13337/api/v1/token');
  this.passthrough('http://127.0.0.1:13337/api/v1/users/**');

  this.get('/recipe/:id/comments', function (schema, request) {
    const recipeId = request.params.id;
    console.log(schema.comment.where({recipeid: recipeId}));
    return schema.comment.where({recipeid: recipeId});
  });

  this.post('api/v1/comments', function (schema, request) {
    console.log(schema.comment);
    let temp = schema.comment.create("comment", request);
    console.log(schema.comment.where({recipeid: 1}));
    return temp;
  });

  /*this.get("api/v1/recipes", function () {
    return {
      data: [
        {
          id: 1, type: "recipe", attributes: {
          recipeid: 1,
          name: "test",
          author: "admin",
          tags: ["test1", "test2"],
          image: "http://placehold.it/250x150",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        },
        {
          id: 2, type: "recipe", attributes: {
          recipeid: 2,
          name: "test",
          author: "admin",
          image: "http://placehold.it/250x150",
          tags: ["test3", "test4"],
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        },
        {
          id: 3, type: "recipe", attributes: {
          recipeid: 3,
          name: "test",
          author: "admin",
          image: "http://placehold.it/250x150",
          tags: ["test5", "test6"],
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        },
        {
          id: 4, type: "recipe", attributes: {
          recipeid: 4,
          name: "test",
          author: "admin",
          image: "http://placehold.it/250x150",
          tags: ["test5", "test6"],
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        },
        {
          id: 5, type: "recipe", attributes: {
          recipeid: 5,
          name: "test",
          author: "admin",
          image: "http://placehold.it/250x150",
          tags: ["test1", "test5"],
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        },
        {
          id: 6, type: "recipe", attributes: {
          recipeid: 6,
          name: "test",
          author: "admin",
          image: "http://placehold.it/250x150",
          tags: ["test4", "test2"],
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor ante ut odio tincidunt interdum. Etiam sodales elementum metus sed egestas. Donec mattis sollicitudin tempor. Donec finibus nisl vitae turpis tristique hendrerit. "
        }
        }
      ]
    };
  });
  this.get("api/v1/recipes/:recipe_id", function (db, request) {
    let recipe_id = request.params.recipe_id;

    return {
      data: {
        id: recipe_id, type: "recipe", attributes: {
          recipeid: 1,
          name: "test",
          preptime: "15 mins",
          cooktime: "20 mins",
          author: "admin",
          tags: ["test1", "test2"],
          image: "http://placehold.it/250x150",
          body: "<p><!-- Example content, later it will be fetched from the server, of course --> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id diam risus. Nam egestas ipsum a quam condimentum luctus. Sed magna nibh, fringilla sit amet urna a, cursus porttitor urna. Ut ipsum metus, consequat quis lectus eget, tristique vehicula sapien. Nunc blandit nulla vitae bibendum pulvinar. Ut tincidunt posuere mi et facilisis. Donec sit amet laoreet tortor. Vestibulum posuere neque et mi imperdiet viverra. Ut ultricies dui a sodales dictum. Proin placerat vulputate faucibus. Duis quis luctus sem, in imperdiet arcu. Sed ut aliquam lectus. Vivamus sit amet tempor tortor. </p> <p>Aliquam pharetra dignissim dolor eget varius. Aliquam eu libero quis dolor ultricies consequat vel nec lacus. In pellentesque aliquet dolor, ut sodales quam consequat sed. Maecenas blandit molestie tortor sed congue. Suspendisse rutrum et metus quis condimentum. Quisque vehicula eros eget mauris rhoncus scelerisque. Sed sit amet tempus tortor. Phasellus ac lacus eu nulla pellentesque ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p> <p>Donec eget magna nec lectus fringilla sagittis a vitae leo. Aliquam nec ligula venenatis massa blandit vehicula ac eu erat. Integer condimentum elit vel consectetur molestie. Praesent varius libero nec nibh tempor, quis tincidunt velit rhoncus. Morbi consequat auctor pharetra. Donec dapibus felis et volutpat interdum. Vestibulum elementum id libero sit amet eleifend. Duis varius sollicitudin ex. Vivamus cursus aliquet sem et suscipit. Proin hendrerit volutpat eros. Curabitur iaculis pharetra libero, ut dapibus justo vestibulum a. Proin nisl nisl, sodales vitae laoreet sit amet, finibus at justo. Suspendisse viverra sollicitudin mauris vel convallis. Ut eu ipsum eros. Nullam neque massa, rutrum vitae laoreet a, faucibus sed tortor. Integer nec consectetur mauris.</p> <p>Morbi lacinia ex dignissim, congue diam eget, pellentesque nibh. Pellentesque non interdum neque. Fusce felis tellus, ullamcorper sit amet quam at, dictum viverra massa. Pellentesque molestie consequat justo sit amet gravida. Pellentesque eleifend nulla erat, quis convallis orci sollicitudin non. Pellentesque sit amet eleifend nulla. Nullam nisl nisi, lacinia ac elit sit amet, lacinia dignissim mi. Donec non orci quis erat porta vehicula vitae nec quam. In nibh est, volutpat eget urna eu, feugiat hendrerit justo. Phasellus sagittis, leo vel maximus semper, nibh dui euismod nisl, vel placerat arcu lectus eu neque. Ut sit amet bibendum tortor, id molestie nulla.</p> <p>Nunc in tristique felis. Quisque sed consectetur nulla, id molestie ipsum. Aenean fringilla accumsan risus vitae tempus. Quisque risus eros, pellentesque et turpis sit amet, ullamcorper tincidunt lorem. In venenatis, massa ac cursus tincidunt, sem elit efficitur quam, eu faucibus neque libero ullamcorper ex. Pellentesque felis diam, fermentum a leo vitae, posuere lacinia nulla. Vestibulum vulputate lacus dui, tristique volutpat quam feugiat at. Aliquam erat volutpat. Integer finibus libero ligula, sit amet fringilla risus interdum ut. </p>",
          comments: [1, 2]
        },
        relationships: {
          comments: {
            data: {
              type: "comment",
              id: "1"
            }
          }
        }
      }
    };
  });

  this.get("api/v1/comments/:comment_id", function (db, request) {
    let comment_id = request.params.comment_id;
    return {
      data: {
        id: comment_id,
        attributes: {
          author: "memer",
          body: "<p>FIRST!!!</p>"
        }
      }
    };
  });

  this.get("api/v1/comments", function () {
    return {
      data: [
        {
          id: 1,
          attributes: {
            commentid: 1,
            recipeid: 1,
            author: "memer",
            body: "<p> FIRST! </p>"
          }
        }
      ]
    }
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
