import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


// component to render contacts added to the phonebook and delete buttons
const Persons = (props) => {  
  const { persons, setPersonToDelete, deletePerson } = props
  return(
    persons.map((person) => 
    <form  key={person.id} onSubmit={deletePerson}>
    <div className={"nameStyle"}  key={person.name}>      
      {[<b key={person.name}>{'Name: '}</b>, person.name]} {[<b key={person.number}>{'  number: '}</b>, person.number]}
      <button className={"button"} type="submit" onClick={() =>{
        setPersonToDelete(persons.find(p => p.name.toLowerCase() === person.name.toLowerCase()))
      } 
    }>delete</button>
      </div>
    </form>
    )
  )
}

// component to render the filter field
const Filter = (props) => {
  const { filterChange } = props
  return(
    <tbody >
      <tr >
      <td > <b>{'Filter show with '}</b> </td>
      <td ><input onChange={filterChange} /> </td>
      </tr>
    </tbody>
  )
}

// component for rendering name and number entry and button
const PersonForm = (props) => {
  const  { addPerson, newName, nameChange, newNumber, numberChange } = props
  return (
    <form  onSubmit={addPerson}>
        <div className={"labelStyle"}>
          {'Name: '}<input value={newName}
          onChange={nameChange}/>
        </div>
        <div className={"labelStyle"}>
          {'Number: '}<input value={newNumber}
          onChange={numberChange}
          />
          </div>
        <div>
          <button className={"button"} type="submit">add</button>
        </div>
      </form>
  )
}


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
  
  // Componen to add new person to phonebook or chage number if already exists
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
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName} to phonebook`)
      setColorClass("nameAdded")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      setMessage(`${personToDelete.name} has been removed`)
        setColorClass("nameRemoved")
        setTimeout(() => {
          setMessage(null)
        }, 5000)})
    .catch(error => {
        setMessage(`Information of ${personToDelete.name} has already been removed from server`)
        setColorClass("error")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.name !== personToDelete.name))
      })
    }
    }
  
  // component to change number in case contact already exist
  const changeNumber = name => {
    const person = persons.find(p => p.name.toLowerCase() === name.toLowerCase())
    console.log(person)
    const personChanged = { ...person, number: newNumber}
    console.log(personChanged)
    personService
    .update(personChanged.id, personChanged)
    .then(returnPersons => {
      setPersons(persons.map(person => person.id !== personChanged.id ? person : returnPersons))
    })
    setMessage(`Number of ${personToDelete.name} has been changed`)
      setColorClass("numberChanged")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
  return (
    <div>
      <h2 className={"headerStyle"}>{'Phonebook'}</h2>
      <Notification message={message} colorClass={colorClass} />
      <table className={"labelStyle"}>
      <Filter filterChange={handleFilterChange}/>
      </table>
      <h2 className={"headerStyle"}>{'Add a new contact'}</h2>
      <PersonForm addPerson={addPerson} persons={persons} setPersons={setPersons}
      setNewName={setNewName} newName={newName} nameChange={handleNameChange}
      newNumber={newNumber} numberChange={handleNumberChange}
      />
      <h2 className={"headerStyle"}>{'Numbers'}</h2>
      <Persons persons={persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))}
        personToDelete={personToDelete} setPersonToDelete={setPersonToDelete}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App
