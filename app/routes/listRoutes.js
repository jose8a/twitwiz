module.exports = function(router) {
  // get a collection of all my lists
  router.get('/', (req, res, next) => {
    console.log("LISTROUTER - path: '/'");
    res.status(200).send("I am ALL LISTS");
  });

  // get all 'favorites' tweets
  router.get('/favorites', (req, res, next) => {
    console.log(`LISTROUTER - path: '/favorites'`);
    res.status(200).send("I am FAVORITES");
  });

  // get all 'non-favorites' lists' tweets
  router.get('/:listname', (req, res, next) => {
    const listname = req.params.listname;
    console.log(`LISTROUTER - path: '/${listname}'`);
    res.status(200).send(`I am ${listname}`);
  });
};
