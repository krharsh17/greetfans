import bcrypt from 'bcrypt';
import shortid from 'shortid';
import slug from 'slug';
import gravatar from 'gravatar';
import {generateToken} from '../../../utils/authToken';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()
// Used to create platform for normal authentication (email+pwd)
export default async (req, res) => {
    const {firstName, lastName, email, password, platformName} = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);
    let normalizedEmail = email.toLowerCase();

    // Creates a new account with email and password and signs in
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
        console.log(err)
    })

    if (firebase.auth().currentUser) {
        const user = {
            userId: firebase.auth().currentUser.uid,
            firstName: firstName,
            lastName: lastName,
            email: normalizedEmail,
            password: hashedPassword,
            avatar: gravatar.url(normalizedEmail, {s: '400'}),
        };
        await firebase.firestore().collection("users").doc(user.userId).set(user);


        let platform = {
            platformId: shortid.generate(),
            ownerUserId: user.userId,
            name: platformName,
            slug: slug(platformName),
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            email: '',
            description: '',
        };
        await firebase.firestore().collection("platforms").doc(platform.platformId).set(platform);


        const token = generateToken({
            userId: user.userId,
        });

        res.send({token: token});
    } else {
        res.status(401).send({message: "Failed auth"})
    }


};
