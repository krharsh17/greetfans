import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import slug from 'slug';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

export default requireAuthEndpoint(async (req, res) => {
    let authenticatedUserId = req.authToken.userId;
    let id = req.query.id;

    if (req.method !== 'PUT') {
        return res.status(400).json();
    }

    try {
        let properties = {...req.body};
        properties.slug = slug(properties.name);

        let listSnap = await firebase.firestore()
            .collection("platforms")
            .where("platformId", "==", id)
            .where("ownerUserId", "==", authenticatedUserId)
            .get()

        let list = []

        listSnap.forEach(doc => {
            list.push(doc.data())
            firebase.firestore().collection("platforms")
                .doc(doc.data().platformId)
                .update(properties)
        })

        return res.status(200).json(list);
    } catch (err) {
        return res.status(400).json(err);
    }
});
