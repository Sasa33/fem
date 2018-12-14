import React from "react";
import petfinder from "./petfinder";
import { navigate } from "@reach/router";

class Details extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          loading: false,
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          media: pet.media,
          breed
        });
      })
      .catch(() => {
        // this.setState({ error: err });
        navigate("/");
      });
  }

  render() {
    return <h1>hi!</h1>;
  }
}

export default Details;
