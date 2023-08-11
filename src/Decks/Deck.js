import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams, useHistory} from "react-router-dom"
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

function Deck() {
    const [cardList, setCardList] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();
    const [deckData, setDeckData] = useState([])

    //Fetch the decks data and the card list within it
    useEffect(() => {
        async function getCardData() {
            try {
                const initialDeckData = await readDeck(deckId);
                setCardList(initialDeckData.cards);
                setDeckData(initialDeckData);

            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        }
        getCardData();
    }, [deckId]); // Run the effect whenever deckId changes

    //delete handler for the delete buttons on the cards in the list
    const handleDelete = async (cardId) => {
        if (window.confirm("Delete this card? You will not be able to recover it.")){
            try {
                await deleteCard(cardId);
                history.go()
            } catch (error) {
                console.error("Error deleting card:", error);
            }
        } else {
            history.go();
        }
    }

    //delete handler for the delete button that removes the deck entirely
    const handleDeckDelete = async (deckId) => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")){
            try {
                await deleteDeck(deckId);
                history.push("/");
                history.go();
            } catch(error) {
                console.error("Error deleting deck:", error);
            }
        } else {
            history.go();
        }
    };


    //maps the list of cards with both sides of their content displayed
    const deckDisplay = cardList.map((card) => {
        return (
            <li className="list-group-item" key={card.id}>
                <div className="d-flex justify-content-between">
                    <p className="col-6">{card.front}</p>
                    <p className="col-6">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
            </li>
        )
    })

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
                        <a className="nav-link disabled">{deckData.name}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container container-fluid">
            <h3>{deckData.name}</h3>
            <p>{deckData.description}</p>
            <button className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
            <button className="btn btn-primary mr-2" onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
            <button className="btn btn-primary mr-2" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Card</button>
            <button className="btn btn-danger align-self-end mr-2" onClick={() => handleDeckDelete(deckId)}>Delete</button>
            <h2 className="mt-3 mb-2">Cards</h2>
            <ul className="list-group container">
                {deckDisplay}
            </ul>
        </div>
    </div>
    )
}

export default Deck;