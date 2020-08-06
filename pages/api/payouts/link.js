import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'
import firebase from 'firebase/app'
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

initFirebase()

export default requireAuthEndpoint(async (req, res) => {
    let authenticatedUserId = req.authToken.userId;

    try {
        // 1) Get User
        let userSnapshot = await firebase.firestore()
            .collection("users")
            .where("userId", "==", authenticatedUserId).get()

        let userAccount = {}
        if(userSnapshot.docs.length > 0)
            userAccount = userSnapshot.docs[0].data()

        if (!userAccount.stripe) {
            throw new Error('No stripe account found');
        }

        // 2) Call Stripe
        let stripeUserId = userAccount.stripe.stripeUserId;
        let stripeReq = await stripe.accounts.createLoginLink(stripeUserId);

        // 3) Return url
        return res.status(200).json(stripeReq);
    } catch (err) {
        logger.log('accountLink.err', err);
        return res.status(400).json(err);
    }
});
