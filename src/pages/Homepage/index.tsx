import React, { useEffect } from "react";
const Homepage: React.FC = () => {
  useEffect(() => {
    window.location.href = "/popular";
  }, []);
  return <div>{/*TODO Homepage*/}</div>;
};

export default Homepage;
