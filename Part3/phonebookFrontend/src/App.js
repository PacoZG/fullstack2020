import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './index.css'

const App = () => {
  
  const [ personToDelete, setPersonToDelete ] = useState ('')
  const [ persons, setPersons ] = useState ([])
  const [ newName, setNewName ] = useState ('')
  const [ newNumber, setNewNumber ] = useState ('')
  const [ newFilter, setFilter ] = useState ('')
  const [ message, setMessage ] = useState('')
  const [ colorClass , setColorClass ] = useState('')
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)})
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
  
  const actionMessage = (message, colorClass) => {    
    setMessage(message)
    setColorClass(colorClass)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Component to add new person to phonebook or chage number if already exists
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name.toLowerCase())
    if (names.includes(newName.toLowerCase())){
      if (window.confirm (`${newName} is already added to phonebook, replace the old number with a new one?`)){
        changeNumber(newName)
      }
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
    }
    personService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      actionMessage(`Added ${newName} to phonebook`, "nameAdded" )
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      actionMessage(error.response.data.error, "error")
      console.log(error.response.data.error)
    })
    }
  }

  // component to delete person from de phonebook
  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${personToDelete.name}?`)){
    personService
      .erase(personToDelete.id).then(() =>{
      setPersons(persons.filter(p => p.name !== personToDelete.name))
      actionMessage(`${personToDelete.name} has been removed`, "nameRemoved" )
    }).catch(() => {
        setPersons(persons.filter(p => p.name !== personToDelete.name))
        actionMessage(`Information of ${personToDelete.name} has already been removed from server`, "error" )
      })
    }
  }
  
  // component to change number in case contact already exist
  const changeNumber = name => {
    const person = persons.find(p => p.name.toLowerCase() === name.toLowerCase())
    const personChanged = { ...person, number: newNumber}
    personService
    .update(personChanged.id, personChanged)
    .then(returnPersons => {
      setPersons(persons.map(person => person.id !== personChanged.id ? person : returnPersons))
      actionMessage(`Number of ${person.name} has been changed`, "numberChanged" )
    })
    .catch(error => {
      actionMessage(error.response.data.error, "error")
      console.log(error.response.data.error)
    })
  }

  if (persons.length === 0){
    return (
      <div>
        <h2 className={"headerStyle"}>{'Phonebook'}</h2>
        <Notification message={message} colorClass={colorClass} />
        <table className={"labelStyle"}>
        <Filter filterChange={handleFilterChange}/>
        </table>
        <h2 className={"headerStyle"}>{'Add a new contact'}</h2>
        <PersonForm addPerson={addPerson} newName={newName} nameChange={handleNameChange}
          newNumber={newNumber} numberChange={handleNumberChange} />
        <h2 className={"headerStyle"}>{'Numbers'}</h2>
        <h3 className={"headerStyle"}>{`You have no contacts to show`}</h3>
      </div>
    )
  } else {
  return (
    <div>
      <h2 className={"headerStyle"}>{'Phonebook'}</h2>
      <Notification message={message} colorClass={colorClass} />
      <table className={"labelStyle"}>
      <Filter filterChange={handleFilterChange}/>
      </table>
      <h2 className={"headerStyle"}>{'Add a new contact'}</h2>
      <PersonForm addPerson={addPerson} newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange} />
      <h2 className={"headerStyle"}>{'Numbers'}</h2>
      <Persons persons={persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}
        personToDelete={personToDelete} setPersonToDelete={setPersonToDelete}
        deletePerson={deletePerson} />
    </div>
    )
  }
}

export default App
