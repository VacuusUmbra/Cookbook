export default function (server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  const recipe = server.createList('recipe', 10);

  server.loadFixtures('comments');
  server.create('comment', {recipeid: 1});
  server.create('comment', {recipeid: 1});
  server.create('comment', {recipeid: 1});
  server.create('comment', {recipeid: 1});
  server.create('comment', {recipeid: 1});
  server.create('comment', {recipeid: 2});
  server.create('comment', {recipeid: 2});
  server.create('comment', {recipeid: 2});
  server.create('comment', {recipeid: 2});
  server.create('comment', {recipeid: 3});
}
