import React from 'react';

function Logout() {
    const clearSession = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <button type="submit" onClick={clearSession}>Logout</button>
    )
}

export default Logout;