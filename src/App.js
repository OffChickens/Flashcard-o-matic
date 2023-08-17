import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Study from "./Decks/Study";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Decks/AddCard";
import EditCard from "./Decks/EditCard";
import "./App.css";
import Header from "./Layout/Header";
import DeckList from "./Decks/DeckList";
import { useState, useEffect } from "react";
import { listDecks } from "./utils/api";
import NotFound from "./Layout/NotFound";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
      async function getDecks() {
          try {
              const decks = await listDecks(); // Call the listDecks function
              setDeckList(decks);
          } catch (error) {
              console.error('Error fetching decks:', error);
          }
      }
      getDecks();
  }, []);


    return (
      <div className="app-routes">
        <Header />
        <Switch>
          <Route exact path="/">
            <Layout />
            <DeckList deckList={deckList}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }


export default App;
