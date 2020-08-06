/* globals window */
import {useEffect, useState} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import initFirebase from '../utils/initFirebase'
import {handleProviderLogin} from "../utils/auth";
import logger from "../helpers/logger";

// Init the Firebase app.
initFirebase()

// Constructing the firebase auth config object for the firebase-ui component
const firebaseAuthConfig = {
    signInFlow: 'popup',
    // Added the available providers here
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none',
    // omitted succesCallbackUrl to handle redirection manually
    callbacks: {
        // Once authenticated, proceeding with the in-app flow of onboarding platform
        signInSuccessWithAuthResult: async ({user}, redirectUrl) => {
            const url = `/api/login/providerToken`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({uid: user.uid}),
                });
                if (response.ok) {
                    const {token} = await response.json();
                    handleProviderLogin(token, user);
                } else {
                    logger.log('Login failed.' + response.statusText);
                }
            } catch (error) {
                console.error(
                    'You have an error in your code or there are Network issues.',
                    error,
                );
                this.setState({
                    error: response.statusText,
                });
            }
        },
    },
}

const FirebaseAuth = () => {
    // Do not SSR FirebaseUI, because it is not supported.
    // https://github.com/firebase/firebaseui-web/issues/213
    const [renderAuth, setRenderAuth] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth
                    uiConfig={firebaseAuthConfig}
                    firebaseAuth={firebase.auth()}
                />
            ) : null}
        </div>
    )
}

export default FirebaseAuth