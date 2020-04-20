const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(router) {
  // Retrieve relevant meta-tag information for an external URL
  router.post('/', (req, res, next) => {
    console.log("META - path: '/'");

    const url = req.body.url;
    axios.get(url).then((response) => {
      let $ = cheerio.load(response.data);

      // retrieve <meta> information from the requested url
      let ogUrl = $('head > meta[property="og:url"]').attr('content');
      let ogTitle = $('head > meta[property="og:title"]').attr('content');
      let ogDescr = $('head > meta[property="og:description"]').attr('content');
      let xxDescr = $('head > meta[name="description"]').attr('content');

      /*
       *  =============================================================
       *  if the requested URL is shortened, try to retrieve the full URL from
       *  the Open Graph `og:url` meta tag
       *    \--> meta[og:url]  --OR-- url-path-words
       */
      let respUrl = ogUrl || req.body.url;

      /*
       *  =============================================================
       *  extract title from one of the following sources in the following
       *  preferred order:
       *    \--> meta[og:title]  --OR--
       *    \--> url-path-words  --OR--
       *    \--> twitter.content
       */
        // generate title from input URL word fragments
      let urlTitle = url.split('/');

        // remove white space fragment at END due to trailing '/' of input URL
      if (urlTitle[urlTitle.length -1] === '') {
        urlTitle.pop();
      }
      urlTitle = urlTitle[urlTitle.length -1].split('-').join(' ');

      let respTitle = ogTitle || urlTitle;

      /*
       *  =============================================================
       *  extract description from any of these sources in the
       *  following order:
       *    \--> meta[og:description]  --OR--
       *    \--> meta[description]  --OR--
       *    \--> url-path-words  --OR--
       *    \--> twitter.content
       */
        // generate description from tweet content in the request
      let twitContent = req.body.content.replace(/@\w+/g, '');
      twitContent = twitContent.replace(/http\S+\s*/g, '');

      let respDesc = ogDescr || xxDescr || twitContent;

      /* =============================================================
       * --- TODO: extract tags from any of the following sources:
       *    \--> meta[og:title]  --OR--
       *    \--> meta[og:description]  --OR--
       *    \--> meta[description]  --OR--
       *    \--> url-path-words  --OR--
       *    \--> twitter.content
       * =============================================================
       */

      // generate response envelope
      //      -- TODO:  tags::ARRAY[STRING]
      const respMeta = { url: respUrl, title: respTitle, description: respDesc };

      res.status(200).send({meta: respMeta });
    });
  });
};



