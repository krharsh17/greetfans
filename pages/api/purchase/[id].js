import stripe from '../../../helpers/stripe';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

export default async (req, res) => {
    let sessionId = req.query.id;
    let platformId = req.query.platformId;

    try {
        let platformSnap = await firebase.firestore()
            .collection("platforms")
            .doc(platformId)
            .get()

        let platform = platformSnap.data()

        if (!platform) {
            throw new Error('platform not found');
        }

        let stripeUserId = platform.stripe.stripeUserId;

        let session = await stripe.checkout.sessions.retrieve(sessionId, {
            stripeAccount: stripeUserId,
        });

        return res.status(200).json(session);
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};
