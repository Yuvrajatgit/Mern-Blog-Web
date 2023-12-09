import React from "react";
import "./style.css";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const NotFound = () => {
    return (
        <div className="pageNotFound">
                <div className="notfound">
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
                </div>
        </div>
    );
};

export default NotFound;