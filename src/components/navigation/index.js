import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { getPetTypes } from "../../api/petfinder";
import Logo from "../../assets/logo.svg";
import Search from "../search";

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  const navLinkClassName = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" />
        <Search />
      </div>
      <ul className="nav-links">
        <li key={"all"}>
          <NavLink to="/" className={navLinkClassName}>
            All Pets
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                <NavLink
                  to={`/${type._links.self.href.split("/").pop()}`}
                  key={type.name}
                  className={navLinkClassName}
                >
                  {type.name}s
                </NavLink>{" "}
              </li>
            ))
          : "Loading..."}
      </ul>
    </nav>
  );
};

export default Navigation;
