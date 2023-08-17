import React from "react";
import { useState, useEffect } from "react";
import { readCard, } from "../utils/api";
import { useHistory } from "react-router-dom";



function Card( { deckData } ) {
    const [cardId, setCardId] = useState(0)
    const [cardText, setCardText] = useState('')
    const [cardList, setCardList] = useState([])
    const [cardContent, setCardContent] = useState([])
    const [cardFlip, setCardFlip] = useState(false)
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [nextCardLoad, setNextCardLoad] = useState(true);

    //Fetch the data for all of the cards in the deck
    useEffect(() => {
        console.log(`card ${loading}`)
        const abortController = new AbortController();

        async function getCardData() {
            try {
                setCardList(deckData.cards);
                console.log(`card ${loading}`)
                if (deckData.cards.length > 0) {
                    if (cardId === 0) setCardId(deckData.cards[0].id);
                    if (deckData.cards && deckData.cards.length > 0) {
                        console.log(`card ${loading}`)
                        const correctCard = deckData.cards.find(card => card.id === cardId);
                        if (correctCard) {
                            console.log(`card ${loading}`)
                            setLoading(false);
                            const cardData = await readCard(correctCard.id);
                            setCardText(cardData.front);
                            setCardContent(cardData);
                            setNextCardLoad(false);
                            console.log(`card ${loading}`)
                                
                        }
                    }
                }   else {
                setLoading(false);
                setNextCardLoad(false)
                }
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        }

        getCardData();

        return () => {
            abortController.abort();
        };
    }, [ cardId, ]);

        
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
        setNextCardLoad(true);
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




    if (loading === true) {
        return <h3>Loading...</h3>
    }

    if (nextCardLoad) {
        return (
            <div className="card container container-fluid">
                <div className="card-body">
                    <h5 className="card-title">Loading...</h5>
                </div>
            </div>
        )
    }


    const currentIndex = cardList.findIndex(card => card.id === cardId)

    console.log(`card ${loading}`)

    //If there aren't enough cards in the deck to study, display a message and allow cards to be added
    if (cardList.length < 3 || !cardList.length === 0) { 
        return (
            <div className="container container-fluid">
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
                <button className="btn btn-primary" onClick={() => history.push(`/decks/${deckData.id}/cards/new`)}>Add cards</button>
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