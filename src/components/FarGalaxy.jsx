import {useEffect, useState} from "react";
import {baseUrl} from "../utils/constants.js";

const FarGalaxy = () => {
    const [openingCrawl, setOpeningCrawl] = useState('Loading...');

    useEffect(() => {
        const episode = Math.floor(Math.random() * 6 + 1);
        fetch(`${baseUrl}/v1/films/${episode}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch films`);
                }
                return res.json();
            })
            .then(data => setOpeningCrawl(data.opening_crawl))
            .catch(e => setOpeningCrawl(e.message));
    }, [])

    return (
        <p className="farGalaxy">
            {openingCrawl}
        </p>
    );
};

export default FarGalaxy;