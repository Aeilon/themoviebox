import gridActive from "../../../images/gridActive.png";
import grid from "../../../images/grid.png";
import flexActive from "../../../images/flexActive.png";
import flex from "../../../images/flex.png";
import React, { useContext } from "react";
import { ViewContext } from "../../../context/ViewContext";
import { GridIcon } from "../ChangeViewIcons";
import { FlexIcon } from "../ChangeViewIcons";

const ChangeView: React.FC = () => {
  const [displayType, setDisplayType] = useContext(ViewContext);
  return (
    <div className="change-view">
      <GridIcon displayType={displayType} setDisplayType={setDisplayType} />
      <FlexIcon displayType={displayType} setDisplayType={setDisplayType} />
    </div>
  );
};

export default ChangeView;
