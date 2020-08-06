import initFirebase from "../../../../utils/initFirebase";
import 'firebase/firestore'
import firebase from 'firebase/app'

initFirebase()

// Getting the platform data via slug
export default async (req, res) => {
    let slug = req.query.slug;

    console.log('slug', slug);

    try {
        let itemSnap = await firebase.firestore()
            .collection("platforms")
            .where("slug", "==", slug)
            .get()

        let itemData = {}

        if(itemSnap.docs.length > 0)
            itemData = itemSnap.docs[0].data()


        let item = {
            platformId: itemData.platformId,
            name: itemData.name,
            address: itemData.address,
            city: itemData.city,
            state: itemData.state,
            zip: itemData.zip,
            phone: itemData.tel,
            email: itemData.email,
            timings: itemData.availableTimings,
            slug: itemData.slug,
            tagline: itemData.tagline,
            coverURL: itemData.coverURL,
            platformLogo: itemData.platformLogo,
            stripe: itemData.stripe,
        }

        return res.status(200).json(item);
    } catch (err) {
        console.log('err', err);
        return res.status(400).json(err);
    }
};
