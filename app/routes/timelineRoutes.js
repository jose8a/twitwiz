module.exports = function(router) {
  // Get the logged-in user's home timeline
  router.get('/', (req, res, next) => {
    console.log("TIMELINEROUTER - path: '/timeline'");
    res.status(200).send("I am HOME TIMELINE");
  });

  // Get the logged-in user's timeline for a specified list
  router.get('/:listname', (req, res, next) => {
    const listname = req.params.listname;
    console.log(`TIMELINEROUTER - path: '/timeline/${listname}'`);
    res.status(200).send(`I see timeline for ${listname}`);
  });

}
