var amazon = require('amazon-product-api');

Secret Access Key:

var client = amazon.createClient({
    awsId: "AKIAIHME2LBUTX2ZKSRA",
    awsSecret: "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",
    awsTag: "aws Tag"
  });

  client.itemSearch({
    Keyword: "",
    searchIndex: 'Book',
    responseGroup: 'ItemAttributes'
  }, function(err, results, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);  // products (Array of Object)
      console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.)
    }
  });