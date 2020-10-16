import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = (props) => {
  const { persons } = props
  return(
    persons.map((person) => <div key={person.name}>{[person.name,' ', person.number]}</div>
    )
  )
}

const Filter = (props) => {
  const { filterChange } = props
  return(
    <form >
      <div>
        filter show with <input
        onChange={filterChange} />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  const  {addPerson, newName, nameChange, newNumber, numberChange } = props
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={nameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={numberChange}
          />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  
  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {    
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    if (names.includes(newName)){
      window.alert (`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} persons={persons}
      setPersons={setPersons} setNewName={setNewName}
      newName={newName} nameChange={handleNameChange}
      newNumber={newNumber} numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}/>
    </div>
  )
}

export default App
