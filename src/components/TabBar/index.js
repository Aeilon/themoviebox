import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import grid from "../../images/grid.png";
import flexActive from "../../images/flexActive.png";
import gridActive from "../../images/gridActive.png";
import flex from "../../images/flex.png";
import Genres from "../Genres";
import { ViewContext } from "../../context/ViewContext";
import { ResolutionContext } from "../../context/ResolutionContext";
import {FormattedMessage} from 'react-intl';
const TabBar = () => {
  const endpoints = [
    { name: "Popular", link: "popular" },
    { name: "Upcoming", link: "upcoming" },
    { name: "Top Rated", link: "top_rated" },
  ];
  const [displayType, setDisplayType] = useContext(ViewContext);
  const params = useParams();
  const [isMobile] = useContext(ResolutionContext);
  const endpoint = params.endpoint?.toLowerCase();
  return (
    <div className="TabBar">
      <div className="tabs">
        {endpoints.map((e) => {
          const { name, link } = e;
          return (
            <button
              style={
                link === endpoint
                  ? {
                      color: "rgb(255, 0, 121)",
                      borderBottom: "1px solid rgb(255, 0, 121)",
                    }
                  : null
              }
              key={name}
              onClick={() => (window.location.href = `/${link}`)}
            >
              <FormattedMessage id={name} defaultMessage={name} />
            </button>
          );
        })}
        <Genres />
      </div>
      {!isMobile && (
        <div className="change-viev">
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
      )}
    </div>
  );
};

export default TabBar;
