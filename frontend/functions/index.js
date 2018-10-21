const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//const stripe = require('stripe')(functions.config().stripe.testkey)

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello there user!");
});

/*
exports.createCustomerInStripe = functions.https.onRequest((request, response) => {
  group = request.body.group;
  user = request.body.user;
  return stripe.customers.create({
      email: user.email
    })
    .then(customer => {
      const updates = {}
      updates[`/customers/${customer.id}`] = user.uid;
      updates[`/members/${user.uid}`] = customer.id;
      return admin.database().ref().update(updates);
    })
});

*/
