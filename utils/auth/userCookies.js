import cookies from 'js-cookie'

export const getUserFromCookie = () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
        return
    }
    return JSON.parse(cookie)
    // return JSON.parse(localStorage.getItem('auth'))
}

export const setUserCookie = (user) => {
    // localStorage.setItem('auth', JSON.stringify(user))
    cookies.set('auth', JSON.stringify(user), {
        // firebase id tokens expire in one hour
        // set cookie expiry to match
        expires: 1 / 24,
    })
}

export const removeUserCookie = () => cookies.remove('auth')