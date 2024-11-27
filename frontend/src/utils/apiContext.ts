import axios from 'axios'

export const apiContext = axios.create({
<<<<<<< HEAD
    baseURL: 'https://virtual-office.onrender.com/',
=======
    baseURL: 'https://virtual-office.onrender.com',
>>>>>>> a4daf3279f45b829d638d821fab565fa5a94be20
    headers: {
        'Content-Type': 'application/json'
    }
});


export const setAuthHeader = (token: string) => {
    apiContext.defaults.headers.common['Authentication'] = token;
}
