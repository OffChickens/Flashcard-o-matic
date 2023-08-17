import React from "react";
import { useHistory } from "react-router-dom";

//This is the form that will be used to add cards or edit cards
function CardForm({ handleSubmit, cardData, handleChange, deckId, buttonOne, buttonTwo}) {
    const history = useHistory();
    return (
        <form onSubmit={(handleSubmit)}>
        <div className="col-12">
            <label htmlFor="front" className="form-label my-2">Front</label>
            <textarea type="text" name="front" className="form-control" id="front" placeholder="Front side of card" defaultValue={cardData.front} onChange={(handleChange)}/>
        </div>
        <div className="col-12">
            <label htmlFor="back" className="form-label my-2">Back</label>
            <textarea type="text" name="back" className="form-control" id="back" placeholder="Back side of card" defaultValue={cardData.back} onChange={(handleChange)}/>
        </div>
        <div className="col-12">
            <button type="button" className="btn btn-secondary my-3 mr-2" onClick={() => history.push(`/decks/${deckId}`)}>{buttonOne}</button>
            <button type="submit" className="btn btn-primary my-3 ml-2">{buttonTwo}</button>
        </div>
    </form>
    )
}

export default CardForm;