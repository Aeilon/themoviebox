import React from "react";
import styled from "styled-components";

interface Props {
  displayType: string;
  setDisplayType: React.Dispatch<React.SetStateAction<string>>;
}
interface Icon {
  displayType: string;
  theme: {
    colors: {
      mainColor: string;
      secondaryColor: string;
    };
  };
}

const FlexContainer = styled.div`
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10px;
`;
const FlexShorterElement = styled.div`
  color: white;
  width: 75%;
  height: 5px;
  border: 1.5px solid
    ${({ theme, displayType }: Icon) =>
      displayType === "flex"
        ? theme.colors.mainColor
        : theme.colors.secondaryColor};
  border-radius: 1rem;
`;
const FlexLongerElement = styled(FlexShorterElement)`
  width: 100%;
`;
const GridContainer = styled.div`
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: grid;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
const GridElement = styled.div`
  width: 80%;
  height: 80%;
  background: white;
  border: 1.5px solid
    ${({ theme, displayType }: Icon) =>
      displayType === "grid"
        ? theme.colors.mainColor
        : theme.colors.secondaryColor};
  border-radius: 1px;
`;

export const FlexIcon: React.FC<Props> = ({ displayType, setDisplayType }) => {
  return (
    <FlexContainer onClick={() => setDisplayType("flex")}>
      <FlexLongerElement displayType={displayType} />
      <FlexShorterElement displayType={displayType} />
      <FlexLongerElement displayType={displayType} />
    </FlexContainer>
  );
};

export const GridIcon: React.FC<Props> = ({ displayType, setDisplayType }) => {
  return (
    <GridContainer onClick={() => setDisplayType("grid")}>
      <GridElement displayType={displayType} />
      <GridElement displayType={displayType} />
      <GridElement displayType={displayType} />
      <GridElement displayType={displayType} />
    </GridContainer>
  );
};
