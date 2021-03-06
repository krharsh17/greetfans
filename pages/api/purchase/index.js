import stripe from '../../../helpers/stripe';
import getHost from '../../../utils/get-host';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

export default async (req, res) => {
    if (req.method != 'POST') {
        return res.status(404);
    }


    let platformId = req.body.platformId;
    let productId = req.body.productId;

    try {
        let priceId;

        let platformSnap = await firebase.firestore().collection("platforms")
            .doc(platformId)
            .get()
        let platform = platformSnap.data()

        if (!platform) {
            throw new Error('platform not found');
        }


        let stripeUserId = platform.stripe.stripeUserId;
        let platformFee = 0;

        let prices = await stripe.prices.list(
            {limit: 1, product: productId},
            {
                stripeAccount: stripeUserId,
            },
        );

        if (prices.data) {
            let price = prices.data[0];
            // platformFee = price.unit_amount * 0.1;
            priceId = price.id;
        }

        const successUrl =
            getHost(req) +
            `/p/${platform.slug}/thank-you?sessionId={CHECKOUT_SESSION_ID}`;

        const cancelUrl = getHost(req) + `/p/${platform.slug}/products`;

        const session = await stripe.checkout.sessions.create(
            {
                mode: 'subscription',
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA', 'IN'],
                },
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                // payment_intent_data: {
                //     application_fee_amount: platformFee,
                // },
                success_url: successUrl,
                cancel_url: cancelUrl,
            },
            {
                stripeAccount: stripeUserId,
            },
        ).catch(err => {
            console.log(err)
        })

        console.log("SESSION" + JSON.stringify(session))

        return res.status(200).json(session);
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
};
