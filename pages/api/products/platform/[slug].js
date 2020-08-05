import stripe from '../../../../helpers/stripe';
import firebase from 'firebase/app'
import initFirebase from "../../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

export default async (req, res) => {
  let slug = req.query.slug;

  try {
    let platformSnap = await firebase.firestore().collection("platforms").where("slug", "==", slug).get()

    let platform = {}
    platformSnap.forEach(doc => {
      platform = doc.data()
    })
    // let platform = storage.get('platforms').find({slug: slug}).value();

    if (!platform) {
      throw new Error('platform not found');
    }

    let stripeUserId = platform.stripe.stripeUserId;

    let products = await stripe.products.list(
      {},
      {
        stripeAccount: stripeUserId,
      },
    );

    if (products.data) {
      console.log('products.data', products.data);
      for (let index = 0; index < products.data.length; index++) {
        const product = products.data[index];
        let prices = await stripe.prices.list(
          {limit: 1, product: product.id},
          {
            stripeAccount: stripeUserId,
          },
        );
        if (prices.data) {
          products.data[index].price = prices.data[0];
        }
      }
    }

    return res.status(200).json(products.data);
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({error: err.message});
  }
};
