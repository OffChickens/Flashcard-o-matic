import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard } from "../utils/api";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";


function AddCard() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deckData, setDeckData] = useState([])

    //Get the data of the deck that's adding a card
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
    }, [deckId]); 

    //set an initial form state for the form data
    const initialFormState = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState({...initialFormState});
    //A change handler for the form
    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
            ...formData,
            [target.name]: value,
        });
    };

    //A submit handler for the form pushing the card to the deck
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCard(deckId, formData);
            history.push(`/decks/${deckId}`)
        } catch (error) {
            console.error("Error creating card:", error)
        }
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
                            <a className="nav-link text-primary" onClick={() => history.push(`/decks/${deckId}`)} href="#">{deckData.name}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">/</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Add Card</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h3 className>{deckData.name}: Add Card</h3>
            </div>
            <CardForm handleSubmit={handleSubmit} cardData={{front:"", back:""}} handleChange={handleChange} />
        </div>
    )
}

export default AddCard;