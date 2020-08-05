import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import firebase from 'firebase/app'
import initFirebase from "../../../utils/auth/initFirebase";
import 'firebase/firestore'
initFirebase()

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;


  try {
    let userSnap = await firebase.firestore().collection("users")
        .doc(authenticatedUserId)
        .get()

    let userData = userSnap.data()

    let userAccount = {
      'userId': userData.userId,
      'avatar': userData.avatar,
      'firstName': userData.firstName,
      'lastName': userData.lastName,
      'email': userData.email,
      'stripe': userData.stripe
    }


    // let userAccount = storage
    //   .get('users')
    //   .find({userId: authenticatedUserId})
    //   .pick('userId', 'avatar', 'firstName', 'lastName', 'email', 'stripe')
    //   .value();
    return res.status(200).json(userAccount);
  } catch (err) {
    return res.status(400).json(err);
  }
});
