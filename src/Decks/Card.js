import React from "react";
import { useState, useEffect } from "react";
import { readCard, readDeck } from "../utils/api";
import { useHistory } from "react-router-dom";



function Card( { deckId } ) {
    const [cardId, setCardId] = useState(0)
    const [cardText, setCardText] = useState(null)
    const [cardList, setCardList] = useState([])
    const [cardContent, setCardContent] = useState([])
    const [cardFlip, setCardFlip] = useState(false)
    const history = useHistory();

    //Fetch the data for all of the cards in the deck
    useEffect(() => {
        async function getCardData() {
            try {
                const deckData = await readDeck(deckId);
                setCardList(deckData.cards);
                if (cardId === 0) setCardId(deckData.cards[0].id)

                const correctCard = deckData.cards.find(card => card.id === cardId);
                if (correctCard) {
                    const cardData = await readCard(correctCard.id); // Fetch card details using readCard
                    setCardText(cardData.front);
                    setCardContent(cardData)
                }
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        }
        getCardData();
    }, [deckId, cardId,]);
        
    //Handle the case of the card being flipped
    const handleFLip = () => {
        setCardText(cardContent.back);
        setCardFlip(true)
    }

    //Flip the card back to the front
    const handleFlipBack = () => {
        setCardText(cardContent.front);
        setCardFlip(false)
    }
    
    //Home link handler
    const handleHome = () => {
        history.push("/")
    }

    //Handle the case of pressing the next button, setting the next card in the deck to be displayed on the card
    //If its the last card in the deck, reset the deck or return home
    const handleNext = () => {
        if (currentIndex + 1 < cardList.length) {
            setCardId(cardList[currentIndex + 1].id);
            setCardFlip(false);
        } else {
            if (window.confirm("Restart deck? Click 'cancel' to return home")){
                setCardId(cardList[0].id);
                setCardFlip(false);
            } else {
                handleHome();
            }
        }
    };

    const currentIndex = cardList.findIndex(card => card.id === cardId)

    //If there aren't enough cards in the deck to study, display a message and allow cards to be added
    if (cardList.length < 3) { 
        return (
            <div className="container container-fluid">
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
                <button className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add cards</button>
            </div>
        )
    }

    //If there are enough cards, display the cards as intended
    if (cardFlip === false) {

        return (
            <div className="card container container-fluid">
                <div className="card-body">
                    <h5 className="card-title">Card {currentIndex + 1} of {cardList.length}</h5>
                    <p className="card-text">{cardText}</p>
                    <a href="#" className="btn btn-secondary" onClick={(handleFLip)}>Flip</a>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card container ">
                <div className="card-body">
                    <h5 className="card-title">Card {currentIndex + 1} of {cardList.length}</h5>
                    <p className="card-text">{cardText}</p>
                    <a href="#" className="btn btn-secondary" onClick={(handleFlipBack)}>Flip</a>
                    <a href="#" className="btn btn-primary ml-2" onClick={(handleNext)}>Next</a>
                </div>
            </div>
        )
    }
}

export default Card;