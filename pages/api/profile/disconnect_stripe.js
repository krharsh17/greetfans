import storage from '../../../helpers/storage';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let platformSnap = await firebase.firestore()
        .collection("platforms")
        .where("ownerUserId", "==", authenticatedUserId)
        .get()

    let platform = {}

    platformSnap.forEach(doc => {
      platform = doc.data()
    })

    await firebase.firestore().collection("platforms")
        .doc(platform.platformId)
        .update({'stripe': firebase.firestore.FieldValue.delete()})
    // storage
    // .get('platforms')
    //   .find({ownerUserId: authenticatedUserId})
    //   .unset('stripe')
    //   .write();

    return res.status(200).json('ok');
  } catch (err) {
    return res.status(400).json(err);
  }
});
