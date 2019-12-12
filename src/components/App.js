import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (e) => {
    e.persist()
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  fetchPets = () => {
    if(this.state.filters.type !== 'all'){
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ pets: data })
          //console.log(this.state.pets)
        })
    }
    else{
      fetch(`/api/pets`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pets: data })
        //console.log(this.state.pets)
      })
    }
  }

  handlePetAdoption = (id) => {
    console.log(id)
    this.state.pets.forEach(function(pet){
      if(pet.id === id){
        pet.isAdopted = true
      }
    })
  }

  render() {
    //console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handlePetAdoption}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
