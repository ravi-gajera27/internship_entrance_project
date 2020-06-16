import React from 'react';
const initilInfo = () => {
    let initial_dom = (
        <div className="container-wrapper-right">
            <nav className="navbar bg-info">
                <div className="navbar-header">
                    <div className="navbar-brand" style={{ visibility: 'hidden' }}>
                        initial_dom
                    </div>
                </div>
            </nav>
            <div className="back-content" style={{height: window.innerHeight - 100,backgroundColor:'lightseagreen'}}></div>
        </div>
    )
    return initial_dom;
}

export default initilInfo;