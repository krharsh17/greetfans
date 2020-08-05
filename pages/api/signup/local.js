import bcrypt from 'bcrypt';
import shortid from 'shortid';
import slug from 'slug';
import storage from '../../../helpers/storage';
import gravatar from 'gravatar';
import {generateToken} from '../../../utils/authToken';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

export default async (req, res) => {
  const {firstName, lastName, email, password, platformName} = req.body;

  let hashedPassword = await bcrypt.hash(password, 10);
  let normalizedEmail = email.toLowerCase();

  const user = {
    userId: shortid.generate(),
    firstName: firstName,
    lastName: lastName,
    email: normalizedEmail,
    password: hashedPassword,
    avatar: gravatar.url(normalizedEmail, {s: '400'}),
  };
  // await storage.get('users').push(user).write();
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
  // await storage.get('platforms').push(platform).write();
  await firebase.firestore().collection("platforms").doc(platform.platformId).set(platform);


  const token = generateToken({
    userId: user.userId,
  });

  res.send({token: token});
};
