import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

// Updating user's data
export default requireAuthEndpoint(async (req, res) => {
    let authenticatedUserId = req.authToken.userId;


    try {

        await firebase.firestore().collection("users")
            .doc(authenticatedUserId)
            .update(req.body)

        return res.status(200).json(req.body);
    } catch (err) {
        return res.status(400).json(err);
    }
});
