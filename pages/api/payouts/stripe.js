const querystring = require('querystring');
const env = require('dotenv').config({path: './.env'});
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    // let userAccount = storage
    //   .get('users')
    //   .find({userId: authenticatedUserId})
    //   .value();


    let userSnapshot = await firebase.firestore()
        .collection("users")
        .doc(authenticatedUserId).get()


    let userAccount = userSnapshot.data()


    let clientId = process.env.STRIPE_CLIENT_ID;

    let userEmail = userAccount.email;
    let userFirstName = userAccount.firstName;
    let userLastName = userAccount.lastName;

    let stripeConnectParams = {
      client_id: clientId,
      scope: 'read_write',
      response_type: 'code',
      'stripe_user[email]': userEmail,
      'stripe_user[first_name]': userFirstName,
      'stripe_user[last_name]': userLastName,
    };

    let reqQuery = querystring.stringify(stripeConnectParams);

    const location = `https://connect.stripe.com/oauth/authorize?${reqQuery}`;

    return res.status(200).json({
      location: location,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});
