import React from "react";
import { useState } from "react";
import {useHistory} from "react-router-dom"
import {createDeck} from "../utils/api"

function CreateDeck() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
        cards: []
    };

    const [deckData, setDeckData] = useState({...initialFormState});

    //Change handler for the form 
    const handleChange = (event) => {
        const {name, value} = event.target;
        setDeckData({
            ...deckData,
            [name]: value,
        });
    };

    //Submit handler for the form that brings the user to the decks view page
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newDeck = await createDeck(deckData);
            history.push(`/decks/${newDeck.id}`);
        } catch (error) {
            console.error("Error creating deck:", error);
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
                            <a className="nav-link disabled" href="#">Create Deck</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h1 className="display-4">Create Deck</h1>
            </div>
            <form className="" onSubmit={(handleSubmit)}>
                <div className="col-12">
                    <label htmlFor="name" className="form-label my-2">Name</label>
                    <input type="text" name="name" className="form-control" id="name" placeholder="Deck Name" onChange={handleChange} value={deckData.name}/>
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label my-2">Description</label>
                    <textarea type="text" name="description" className="form-control" id="description" placeholder="Brief description of the deck" onChange={handleChange} value={deckData.description}/>
                </div>
                <div className="col-12">
                    <button type="cancel" className="btn btn-secondary my-3 mr-2" onClick={() => history.push("/")}>Cancel</button>
                    <button type="submit" className="btn btn-primary my-3 ml-2">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;