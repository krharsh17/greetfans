import shortid from 'shortid';
import slug from 'slug';
import gravatar from 'gravatar';
import {generateToken} from '../../../utils/authToken';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()

// Used to create platforms for 3rd party authentication
export default async (req, res) => {
    const {firstName, lastName, email, platformName, uid} = req.body;

    let normalizedEmail = email.toLowerCase();

    const user = {
        userId: uid,
        firstName: firstName,
        lastName: lastName,
        email: normalizedEmail,
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


};
