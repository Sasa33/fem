import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Details from "./Details";
import Results from "./Results";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
