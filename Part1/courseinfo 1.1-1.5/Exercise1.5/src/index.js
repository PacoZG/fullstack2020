import React from 'react'
import ReactDOM from 'react-dom'

const Total = (props) => {
  const { parts } = props
  
  return (
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </div>
  )
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <h1> {course} </h1>
    </div>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <div>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
      <p>{parts[2].name} {parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>      
    )  
}

ReactDOM.render(<App />, document.getElementById('root'))