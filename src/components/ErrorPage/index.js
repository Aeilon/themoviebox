import React from "react";
import {FormattedMessage} from 'react-intl';

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="wrap"
    >
      <h1><FormattedMessage id="Error" defaultMessage="Something went wrong!" /></h1>
    </div>
  );
};
export default ErrorPage;
