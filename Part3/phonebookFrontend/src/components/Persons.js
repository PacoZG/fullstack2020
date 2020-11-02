import React from 'react'

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
      }>{'delete'}</button>
        </div>
      </form>
      )
    )
  }

  export default Persons