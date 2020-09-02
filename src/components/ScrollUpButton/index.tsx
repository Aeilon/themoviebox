import React from "react";
import styled from "styled-components";

const ScrollUpIcon = styled.img`
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  z-index: 99;
`;

interface Props {
  menu: boolean;
  quickSearch: boolean;
}

const ScrollUpButton: React.FC<Props> = ({ menu, quickSearch }) => {
  const ScrollUpFn = (): void => window.scroll(0, 0);
  return (
    <ScrollUpIcon
      style={menu || quickSearch ? { display: "none" } : null!}
      onClick={ScrollUpFn}
      src="https://img.icons8.com/dusk/64/000000/circled-chevron-up.png"
    />
  );
};

export default ScrollUpButton;
