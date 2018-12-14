import React from "react";
import petfinder from "./petfinder";
import Pet from "./Pet";

class Results extends React.Component {
  state = {
    pets: []
  };

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
      <div className="search">
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
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
