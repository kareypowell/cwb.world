import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey);

//Test HTTP Call
export const helloWorld = functions.https.onRequest((request, response) => {
      response.send("Hello from Firebase!");
    });

// create stripe customer on signup
/*
exports.createStripeCustomer = functions.auth
    .user().onCreate(event => {
        const userEmail = event.email
        const userUid = event.uid;
        return stripe.customers.create({
            email: userEmail
        })
        .then(customer => {
            const updates = {}
            updates[`/customers/${customer.id}`] = userUid;
            updates[`/users/${userUid}`] = customer.id;

            return admin.database().ref().update(updates);
        })
    });
    */