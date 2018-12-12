import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;
        const foundPets = data.petfinder.pets;

        if (foundPets && foundPets.pet) {
          if (Array.isArray(foundPets.pet)) {
            pets = foundPets.pet;
          } else {
            pets = [foundPets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        {this.state.pets.map(pet => {
          let breed;
          const petBreed = pet.breeds.breed;
          if (Array.isArray(petBreed)) {
            breed = petBreed.join(", ");
          } else {
            breed = petBreed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
            />
          );
        })}
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
