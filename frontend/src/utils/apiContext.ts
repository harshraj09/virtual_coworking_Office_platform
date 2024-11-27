import axios from 'axios'

export const apiContext = axios.create({
    baseURL: 'https://virtual-office.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});


export const setAuthHeader = (token: string) => {
    apiContext.defaults.headers.common['Authentication'] = token;
}
