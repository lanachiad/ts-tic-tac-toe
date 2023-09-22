import React from 'react';
import "../styles/Logout.css";

function Logout() {
    const clearSession = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <button className="logout_btn" type="submit" onClick={clearSession}>Logout</button>
    )
}

export default Logout;