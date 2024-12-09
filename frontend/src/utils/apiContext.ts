import axios from 'axios'

export const apiContext = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});


export const setAuthHeader = (token: string) => {
    apiContext.defaults.headers.common['Authentication'] = token;
}
