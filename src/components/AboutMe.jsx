import React, {useEffect, useState} from 'react';
import {baseUrl, characterDetails, friends} from "../utils/constants.js";

const AboutMe = () => {
    const [personage, setPersonage] = useState('Loading...');
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];

    useEffect(() => {
        fetch(`${baseUrl}/v1/peoples/1`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch character");
                }
                return res.json();
            })
            .then(data => setPersonage(data))
            .catch(() => setPersonage({name: "Error loading data"}));
    }, []);

    if (!personage) {
        return <p>Loading...</p>;
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
};

export default AboutMe;