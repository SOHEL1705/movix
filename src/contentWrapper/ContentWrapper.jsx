import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;


// CSS
// .contentWrapper {
//     width: 100%;
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 20px;
// }