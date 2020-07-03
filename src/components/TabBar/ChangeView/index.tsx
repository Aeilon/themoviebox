import gridActive from "../../../images/gridActive.png";
import grid from "../../../images/grid.png";
import flexActive from "../../../images/flexActive.png";
import flex from "../../../images/flex.png";
import React, { useContext } from "react";
import { ViewContext } from "../../../context/ViewContext";

const ChangeView: React.FC = () => {
  const [displayType, setDisplayType] = useContext(ViewContext);
  return (
    <div className="change-view">
      <img
        src={displayType === "grid" ? gridActive : grid}
        onClick={() => setDisplayType("grid")}
        alt="grid"
      />
      <img
        src={displayType === "flex" ? flexActive : flex}
        onClick={() => setDisplayType("flex")}
        alt="flex"
      />
    </div>
  );
};

export default ChangeView;
