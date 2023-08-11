import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

function Layout() {
  const history = useHistory();
  return (
    <Fragment>
      <div className="container">
        <button type="button" className="btn btn-secondary" onClick={() => history.push("/decks/new")}>
          Create Deck
        </button>
      </div>
    </Fragment>
  );
}

export default Layout;
