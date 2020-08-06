import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

// Fetch platform data via ownerUserId
export default requireAuthEndpoint(async (req, res) => {
    let authenticatedUserId = req.authToken.userId;

    try {
        let platformSnap = await firebase.firestore()
            .collection("platforms").where("ownerUserId", "==", authenticatedUserId)
            .get()

        let platform = platformSnap.docs[0].data()

        return res.status(200).json(platform);
    } catch (err) {
        return res.status(400).json(err);
    }
});
