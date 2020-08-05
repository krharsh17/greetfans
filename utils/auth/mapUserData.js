export const mapUserData = (user) => {
    const { uid, email, xa } = user
    return {
        id: uid,
        email: email,
        token: xa,
        name: user.displayName,
        photo: user.photoURL,
        provider: user.providerData[0].providerId
    }
}