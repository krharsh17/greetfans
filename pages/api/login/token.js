import {generateToken} from '../../../utils/authToken';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()
// Token generator for email+pwd authentication
export default async (req, res) => {
    const {email, password} = req.body;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {

    })

    if (firebase.auth().currentUser) {
        let userSnapshot = await firebase.firestore()
            .collection("users")
            .where("email", "==", email).get()

        let userAccount = {}

        userSnapshot.forEach(doc => {
            userAccount = doc.data()
        })

        const token = generateToken({
            userId: userAccount.userId,
        });

        res.send({token: token});
    } else {
        return res.status(400).json({message: 'invalid password'});
    }
};
