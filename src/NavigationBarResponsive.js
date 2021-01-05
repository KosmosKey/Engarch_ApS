import React from "react";
import { Link } from "react-scroll";

const NavigationBarResponsive = ({ active, activeNavBar }) => {
  return (
    <div className="NavigationBarResponsive">
      <div
        className={`overlay ${active && "active"}`}
        onClick={activeNavBar}
      ></div>
      <div className={`NavigationBarResponsive__List ${active && "active"}`}>
        <ul>
          <Link
            activeClass="true"
            to="Ydelser"
            spy={true}
            offset={-75}
            smooth={true}
            duration={1250}
          >
            <li onClick={activeNavBar}>YDELSER</li>
          </Link>
          <Link
            activeClass="true"
            to="Info"
            spy={true}
            offset={-125}
            smooth={true}
            duration={1250}
          >
            <li onClick={activeNavBar}>INFO</li>
          </Link>
          <Link
            activeClass="true"
            to="Contact"
            spy={true}
            offset={-200}
            smooth={true}
            duration={1250}
          >
            <li onClick={activeNavBar}>KONTAKT</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBarResponsive;
