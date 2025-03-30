import React, {useCallback, useEffect, useState} from 'react';
import '../Contact.css';
import {baseUrl} from "../utils/constants.js";

const STORAGE_KEY = "listOfPlanets";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const Contact = () => {
    const [planets, setPlanets] = useState(['Loading...']);

    const isExpired = (timestamp) => {
        return new Date().getTime() - timestamp > THIRTY_DAYS;
    };

    const fetchPlanets = useCallback(async () => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (!isExpired(parsedData.timestamp)) {
                    setPlanets(parsedData.planets);
                    return;
                }
            }

            const response = await fetch(`${baseUrl}/v1/planets`);
            if (!response.ok) throw new Error("Could not fetch planets");

            const data = await response.json();
            const planetNames = data.map(item => item.name);
            setPlanets(planetNames);

            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                planets: planetNames,
                timestamp: new Date().getTime()
            }));

        } catch {
            setPlanets(["Error loading data"]);
        }
    }, []);


    useEffect(() => {
        fetchPlanets();
        return () => console.log('Component Contact was unmounted');
    }, [fetchPlanets]);

    return (
        <form className={'containerContact'} onSubmit={e => e.preventDefault()}>

            <label>First Name
                <input type="text" name="firstname" placeholder="Your name.."/>
            </label>


            <label>Last Name
                <input type="text" name="lastname" placeholder="Your last name.."/>
            </label>

            <label>Planet
                <select name="planet">
                    {planets.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
            </label>


            <label>Subject
                <textarea name="subject" placeholder="Write something.." style={{height: '200px'}}></textarea>
            </label>

            <button type="submit">Submit</button>

        </form>
    );
};

export default Contact;