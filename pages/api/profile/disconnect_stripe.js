import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

initFirebase()

//
export default requireAuthEndpoint(async (req, res) => {
    let authenticatedUserId = req.authToken.userId;

    try {
        let platformSnap = await firebase.firestore()
            .collection("platforms")
            .where("ownerUserId", "==", authenticatedUserId)
            .get()

        let platform = platformSnap.docs[0].data()

        await firebase.firestore().collection("platforms")
            .doc(platform.platformId)
            .update({'stripe': firebase.firestore.FieldValue.delete()})

        return res.status(200).json('ok');
    } catch (err) {
        return res.status(400).json(err);
    }
});
