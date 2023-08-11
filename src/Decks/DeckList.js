import React from "react";
import {useHistory} from "react-router-dom"
import { deleteDeck } from "../utils/api";

function DeckList({deckList}) {
    
    const history = useHistory();

    //delete handler for the delete buttons on the decks in the list
    const handleDelete = async (deckId) => {
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


    //maps the list of decks in the API as cards
    const displayDeckList = deckList.map((deck) => {
        return <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">{deck.name}</h5>
                <p>{deck.cards.length} cards</p>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex">
                <button className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                <button className="btn btn-primary mr-2" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                <button className="btn btn-danger ml-auto" onClick={() => handleDelete(deck.id)}>Delete</button>
            </div>
        </li>
    })

    return (
        <div className="container container-fluid">
            <div className="card mt-3">
                <ul className="list-group list-group-flush">
                    {displayDeckList}
                </ul>
            </div>
        </div>
    )
}

export default DeckList;