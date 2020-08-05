import {generateToken} from '../../../utils/authToken';
import initFirebase from "../../../utils/initFirebase";
import 'firebase/firestore'

initFirebase()
// Token generator for 3rd party authentication
export default async (req, res) => {
    const uid = req.body.uid;


    const token = generateToken({
        userId: uid,
    });

    res.send({token: token});
};
