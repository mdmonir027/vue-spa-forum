class AppStorage {

    setToken(token) {
        localStorage.setItem('token', token)
    }

    setUser(user) {
        localStorage.setItem('user', user)
    }

    store(user, token) {
        this.setToken(token)
        this.setUser(user)
    }

    clear() {
        localStorage.clear('token')
        localStorage.clear('user')
    }

    getToken() {
        return localStorage.getItem('token')
    }

    getUser() {
        return localStorage.getItem('user')
    }

}


export default AppStorage = new AppStorage()
