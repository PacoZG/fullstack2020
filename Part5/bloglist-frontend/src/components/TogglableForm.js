import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const TogglableForm = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState(props.buttonLabel)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel('create new blog')
  }

  useImperativeHandle(ref, () => {
    return  toggleVisibility
  })

  return (
    <div className={'normal'}>
      <div style={hideWhenVisible}>
        <button className={'button'} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div >
          {props.children}
          <button className={'button'} onClick={toggleVisibility}>{'cancel'}</button>
        </div>
      </div>
    </div>
  )
})

TogglableForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

TogglableForm.displayName = 'TogglableForm'
export default TogglableForm