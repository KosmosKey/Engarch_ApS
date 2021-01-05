import React, { useState, useEffect } from "react";
import { Container, IconButton } from "@material-ui/core";
import "./NavBar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationBarResponsive from "./NavigationBarResponsive";
import { Link } from "react-scroll";

const NavBar = () => {
  const [navShow, setNavShow] = useState(null);
  const [responsiveNavBar, setResponsiveNavBar] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavBar = () => {
    setResponsiveNavBar(!responsiveNavBar);
  };

  return (
    <nav className={`${navShow && "active"}`}>
      <NavigationBarResponsive
        active={responsiveNavBar}
        activeNavBar={toggleNavBar}
      />
      <Container className="NavBar__ContainerWidth">
        <Link
          activeClass="true"
          to="Home"
          spy={true}
          offset={-100}
          smooth={true}
          duration={1250}
        >
          <div className="Navbar__EngarchLogo">
            <div className="NavBar__EngarchLogoText">
              <h1>engarch</h1>
            </div>
            <p>Ingeniørrådgivning</p>
          </div>
        </Link>

        <div className="NavBar__EngarchLink">
          <Link
            activeClass="true"
            to="Ydelser"
            spy={true}
            offset={-70}
            smooth={true}
            duration={1250}
          >
            <p>YDELSER</p>
          </Link>
          <Link
            activeClass="true"
            to="Info"
            spy={true}
            offset={-120}
            smooth={true}
            duration={1250}
          >
            <p>INFO</p>
          </Link>
          <Link
            activeClass="true"
            to="Contact"
            spy={true}
            offset={-275}
            smooth={true}
            duration={1250}
          >
            <p>KONTAKT</p>
          </Link>
        </div>
        <IconButton onClick={toggleNavBar}>
          <MenuIcon />
        </IconButton>
      </Container>
    </nav>
  );
};

export default NavBar;
