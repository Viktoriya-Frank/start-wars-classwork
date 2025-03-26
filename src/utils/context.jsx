import {createContext, useState} from "react";
import {navItems} from "./constants.js";

export const StarWarsContext = createContext(null);

export function StarWarsProvider({children}) {
    const [page, setPage] = useState(navItems[0]);

    return (
        <StarWarsContext.Provider value={{page, setPage}}>
            {children}
        </StarWarsContext.Provider>
    );
}
