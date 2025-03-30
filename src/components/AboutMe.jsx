import React, {useEffect, useState} from 'react';
import {baseUrl, characterDetails, friends} from "../utils/constants.js";

const LOCAL_STORAGE_KEY = "starWarsPersonage";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const AboutMe = () => {
    const [personage, setPersonage] = useState('Loading...');
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];

    useEffect(() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            const {data, timestamp} = JSON.parse(storedData);
            if (Date.now() - timestamp < THIRTY_DAYS) {
                setPersonage(data);
                return;
            }
        }

        fetch(`${baseUrl}/v1/peoples/1`)
            .then(res => res.json())
            .then(data => {
                setPersonage(data);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({data, timestamp: Date.now() }));
            });
    }, []);

    if (!personage) {
        return <p>Loading...</p>
    }


return (
    <div className="aboutMe">
        <h2>{personage.name}</h2>
        {personage.name !== "Error loading data" ? (
            <>
                <img src={randomFriend} alt="Character" className="character-image"/>
                {characterDetails.map(({label, key, unit}) => (
                    <p key={key}>
                        <strong>{label}:</strong> {personage[key]}{unit}
                    </p>
                ))}
            </>
        ) : (
            <p>Failed to load character data. Please try again later.</p>
        )}
    </div>
);
}
;

export default AboutMe;