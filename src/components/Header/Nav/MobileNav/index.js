import React from "react";

const MobileNav = ({ menu, toggleMenu, toggleQuickSearch }) => {
  return (
    <>
      <img
        onClick={() => {
          // document.body.style.overflow = "hidden";
          toggleQuickSearch(true);
          toggleMenu(false);
        }}
        alt="search"
        src="https://img.icons8.com/dusk/64/000000/search.png"
      />
      <img
        alt="menu"
        onClick={() => {
          toggleMenu(!menu);
        }}
        src="https://img.icons8.com/dusk/64/000000/menu-squared-2.png"
      />
    </>
  );
};

export default MobileNav;
