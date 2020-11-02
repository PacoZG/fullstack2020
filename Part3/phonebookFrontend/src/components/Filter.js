import React, { useState, useEffect } from 'react'

// component to render contacts added to the phonebook and delete buttons
const Filter = (props) => {
    const { filterChange } = props
    return(
      <tbody >
        <tr >
        <td > <b>{'Filter show with: '}</b> </td>
        <td ><input onChange={filterChange} /> </td>
        </tr>
      </tbody>
    )
  }

  export default Filter