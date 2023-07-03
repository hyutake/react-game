import { redirect } from "react-router-dom";

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if(!token) return null;

    const alias = localStorage.getItem('alias');    // alias does not get removed even after logout, but a new login will overwrite it
    const id = localStorage.getItem('id'); 
    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0) {
        // both token and id will change when token expires, alias will not change
        return {token: 'EXPIRED', alias: alias, id: '-1'};
    }

    return {
        token: token,
        alias: alias,
        id: id
    };
}

export function getTokenDuration() {
    // get the stored expiration timing and transform it back to a date object
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);

    // get current time
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();  // find the elapsed time
    return duration;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();
    if(!token) { 
        return redirect('/');
    }
    return null;
}

