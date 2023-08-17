import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";


function EditCard() {
    const params = useParams();
    const {deckId, cardId} = params;
    const [cardData, setCardData] = useState([]);
    const history = useHistory();
    const [newCard, setNewCard] = useState(cardData);
    const [deckData, setDeckData] = useState([]);
    const [loading, setLoading] = useState(true);
    const buttonOne = "Cancel";
    const buttonTwo = "Submit";

    //Fetch the deck data for the given deckId
    useEffect(() => {
        async function getDeckData() {
            try {
                const initialDeckData = await readDeck(deckId);
                setDeckData(initialDeckData);

            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        }
        getDeckData();
    }, [deckId]); // Run the effect whenever deckId changes


    //Fetch the card data for the given cardId
    useEffect(() => {
        async function getCardData() {
            try {
                const initialData = await readCard(cardId);
                console.log(cardId)
                setCardData(initialData);
                setLoading(false);
            } catch (error) {
                console.error("Error updated card:", error)
            }
        }
        getCardData();
    }, [cardId]);

    //change handler for the form
    const handleChange = ({ target }) => {
        const value = target.value;
        setNewCard({
            ...newCard,
            [target.name]: value,
        });
    };

    //submit handler for the form that brings you to the decks view page
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateCard({...newCard, id: cardId, deckId: parseInt(deckId)})
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error updating card:", error)
        }
    }

    if (loading === true) {
        return <h3>Loading...</h3>
    }

    return (
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
                            <a className="nav-link disabled" href="#">Edit Card {cardId}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h2>Edit Card</h2>
            </div>
            <CardForm handleSubmit={handleSubmit} cardData={cardData} handleChange={handleChange} deckId={deckId} buttonOne={buttonOne} buttonTwo={buttonTwo}/>
        </div>
    )
}

export default EditCard;