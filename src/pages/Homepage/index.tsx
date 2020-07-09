import React, { useEffect } from "react";

const Homepage: React.FC = () => {
  useEffect(() => {
    window.location.href = "/popular";
  }, []);

  return <div />;
};

export default Homepage;
