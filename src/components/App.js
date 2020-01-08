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

  //update state.filters.type
    //passing it in a value that will change the type
  onChangeType=(value)=>{
    this.setState({
      filters: {
        ...this.state.filters, type: value
      }

    })
  }

  //fetch a list of pets
  //If the type is 'all', send a request to /api/pets
      //If the type is 'cat', 
      //send a request to /api/pets?type=cat. Do the same thing for dog and micropig
  onFindPetsClick=()=>{
    let URL = '/api/pets'

    if(this.state.filters.type !== 'all'){
       URL += '?type=' + this.state.filters.type
    }

    fetch(URL)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
    })
  }

  //take in an id for a pet, find the matching pet in state.pets 
  //and set the isAdopted property to true.
  onAdoptPet=(id)=>{
    const pets = this.state.pets.map(pet => {
      if (pet.id === id){
        // make the change to the key (isAdopted in this case)
         pet.isAdopted = true
        
      } 
      return pet
      // return pet.id === id
    })
    this.setState({
      pets: pets
    })
    
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType= {this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
