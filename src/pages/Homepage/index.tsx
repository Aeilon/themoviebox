import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Homepage: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    // window.location.href = "/popular";
    history.push("/popular");
  }, []);

  return <div />;
};

export default Homepage;
