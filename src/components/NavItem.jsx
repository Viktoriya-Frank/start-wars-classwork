import React, {useContext} from 'react';
import {StarWarsContext} from "../utils/context.jsx";



const NavItem = ({itemTitle}) => {
    const { setPage } = useContext(StarWarsContext);
    return (
        <li onClick={() => setPage(itemTitle)} className="nav-item btn btn-danger mx-1">{itemTitle}</li>
    );
};

export default NavItem;