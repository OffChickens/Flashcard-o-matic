import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard } from "../utils/api";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";


function AddCard() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deckData, setDeckData] = useState([]);
    const [loading, setLoading] = useState(true);
    const buttonOne = "Done";
    const buttonTwo = "Save";

    //Get the data of the deck that's adding a card
    useEffect(() => {
        const abortController = new AbortController();

        async function getDeckData() {
            try {
                const initialDeckData = await readDeck(deckId, abortController.signal);
                setDeckData(initialDeckData);
                setLoading(false);

            } catch (error) {
                    console.error("Error fetching card data:", error); 
                }
        }
        getDeckData();

        return () => {
            abortController.abort();
        }
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
            setFormData({...initialFormState});
            history.go();
        } catch (error) {
            console.error("Error creating card:", error)
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
                <h3>{deckData.name}: Add Card</h3>
            </div>
            <CardForm handleSubmit={handleSubmit} cardData={{front:"", back:""}} handleChange={handleChange} buttonOne={buttonOne} buttonTwo={buttonTwo} deckId={deckId}/>
        </div>
    )
}

export default AddCard;