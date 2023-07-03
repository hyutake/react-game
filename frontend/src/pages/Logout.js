import { redirect } from "react-router-dom";

export function logoutAction() {
    const proceed = window.confirm('Logout?');
    if(proceed) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('id');
        localStorage.removeItem('alias');
    }
    return redirect('/');
}