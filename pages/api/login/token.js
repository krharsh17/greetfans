import {generateToken} from '../../../utils/authToken';
import bcrypt from 'bcrypt';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

export default async (req, res) => {
  const {email, password} = req.body;

  let userSnapshot = await firebase.firestore()
      .collection("users")
      .where("email", "==" , email).get()

  let userAccount = {}

  userSnapshot.forEach(doc => {
    userAccount = doc.data()
  })

  // let userAccount = storage
  //   .get('users')
  //   .find({email: email})
  //   .value();

  let hashedPassword = userAccount.password;

  let isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (isPasswordMatch) {
    const token = generateToken({
      userId: userAccount.userId,
    });

    res.send({token: token});
  } else {
    return res.status(400).json({message: 'invalid password'});
  }
};
