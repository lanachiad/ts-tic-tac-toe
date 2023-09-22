import React from 'react';
import loading from '../loading.svg';
import "../styles/Loading.css";

function Loading() {
    return(
        <div className="loading_container">
            <img alt="The robots are thinking - loading" src={loading} />
        </div>
    )
}

export default Loading;