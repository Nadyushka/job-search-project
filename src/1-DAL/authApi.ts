import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com',
    withCredentials: true,
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    }
})


export const authApi = {
    authorisedWithPassword(login: string, password: string, client_id: number, client_secret: string, hr: number = 0) {
        const params = {login, password, client_id, client_secret, hr}
        return instance.get<ResponseType>('/oauth2/password/', {params})
    },
    getAccessToken(code: string, client_id: number, client_secret: string, redirect_uri: string) {
        const params = {code, client_id, client_secret, redirect_uri}
        return instance.get<ResponseType>('/oauth2/access_token', {params})
    }
}

type ResponseType = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number,
    "expires_in": number,
    "token_type": string,
}