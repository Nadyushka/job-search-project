import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    withCredentials: true,
    headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    }
})

export const authApi = {
    authorisedWithPassword(login: string, password: string, client_id: number, client_secret: string, hr: number) {
        const params = {login, password, client_id: client_id.toString(), client_secret, hr}
        return instance.get<ResponseTypeAuth>('oauth2/password', {params})
    },
}

type ResponseTypeAuth = {
    "access_token": string,
    "refresh_token": string,
    "ttl": number,
    "expires_in": number,
    "token_type": string,
}
