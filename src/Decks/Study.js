import React from "react"
import { useEffect } from "react";
import Card from "./Card";
import {useParams} from "react-router-dom"
import { useState } from "react";
import { readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



function Study() {
    const {deckId} = useParams();
    const [deckData, setDeckData] = useState([]);
    const history = useHistory();

    //fetch the decks data for the given deckId
    useEffect(() => {
        async function getCardData() {
            try {
                const initialDeckData = await readDeck(deckId);
                setDeckData(initialDeckData);

            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        }
        getCardData();
    }, [deckId]); // Run the effect whenever deckId changes

    //display a proper header and cards given the deck data
    return (
        <div>
        <div className="container">
            <div className="navbar navbar-expand navbar-light bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-primary" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">/</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-primary" onClick={() => history.push(`/decks/${deckId}`)} href="#">Deck {deckData.name}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">/</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Study</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h1 className="container">{deckData.name}</h1>
        <Card deckId={ parseInt(deckId) }/>
        </div>
    )
}

export default Study;