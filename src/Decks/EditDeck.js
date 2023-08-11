import React from "react";
import { updateDeck } from "../utils/api"
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";


function EditDeck() {
    const history = useHistory();
    const [deckData, setDeckData] = useState([])
    const {deckId} = useParams()
    
    const initialFormState = {
        name: "",
        description: "",
        cards: [],
        id: `${deckId}`
    }
    const [newDeck, setNewDeck] = useState(initialFormState)

    //fetch the decks original data
    useEffect(() => {
        async function getDeckData() {
            try {
                const initialDeckData = await readDeck(deckId);
                setDeckData(initialDeckData);
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        }
        getDeckData();
    }, []);

    //change handler for the formn\
    const handleChange = ({ target }) => {
        const value = target.value;
        setNewDeck({
            ...newDeck,
            [target.name]: value,
        });
    };

    //submit handler for the form that bring you to the decks view page after updating
    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            
            await updateDeck(newDeck);
            
            history.push(`/decks/${deckId}`);
        } catch (error) {
            console.error("Error updating deck:", error)
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
                            <a className="nav-link disabled" href="#">Edit Deck</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h2 className>Edit Deck</h2>
            </div>
            <form onSubmit={(handleSubmit)}>
                <div className="col-12">
                    <label for="name" className="form-label my-2">Name</label>
                    <input type="text" name="name" className="form-control" id="name" defaultValue={deckData.name} onChange={(handleChange)}/>
                </div>
                <div className="col-12">
                    <label for="description" className="form-label my-2">Description</label>
                    <textarea type="text" name="description" className="form-control" id="description" defaultValue={deckData.description} onChange={(handleChange)}/>
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-secondary my-3 mr-2" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                    <button type="submit" className="btn btn-primary my-3 ml-2">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck