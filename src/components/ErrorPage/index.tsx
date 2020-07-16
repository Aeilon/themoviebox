import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const ErrorWrap = styled.div`
  width: 75%;
  margin: 5vh auto auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorPage: React.FC = () => {
  return (
    <ErrorWrap>
      <h1>
        <FormattedMessage id="Error" defaultMessage="Something went wrong!" />
      </h1>
    </ErrorWrap>
  );
};
export default ErrorPage;
