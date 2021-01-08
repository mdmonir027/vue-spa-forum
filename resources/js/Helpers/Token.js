class Token {

    isValid(token) {
        const payload = this.payload(token);
        if (payload) {
            return !!(payload.iss === 'http://spa-blog.test/api/auth/login' || 'http://spa-blog.test/api/auth/sign-up');
        }
        return false
    }

    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {
        if (this.isBase64(payload)) {
            return JSON.parse(atob(payload));
        }
        return false;
    }

    isBase64(payload) {
        try {
            return btoa(atob(payload)) === payload;
        } catch (e) {
            return false
        }
    }

}

export default Token = new Token();
