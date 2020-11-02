import React, { useState, useEffect } from 'react'

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

  export default PersonForm