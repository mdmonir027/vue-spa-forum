import Token from "./Token";
import AppStorage from "./AppStorage";

class User {

    login(data) {
        axios.post('/api/auth/login', data).then(response => this.responseAfterLogin(response.data))
            .catch(error => {
                console.log(error.response.data)
            })
    }

    responseAfterLogin(token) {
        const access_token = token.access_token;
        const user = token.user;
        if (Token.isValid(access_token)) {
            AppStorage.store(user, access_token)
            window.location = '/'
        }

    }

    hasToken() {
        const storedToken = AppStorage.getToken();
        if (storedToken) {
            return Token.isValid(storedToken) ? true : false;
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout() {
        AppStorage.clear();
        window.location = '/'
    }

    name() {
        if (this.loggedIn()) {
            return AppStorage.getUser()
        }
        return null;
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
        return 0;
    }

    own(userId) {
        return this.id() === userId
    }

}

export default User = new User();
