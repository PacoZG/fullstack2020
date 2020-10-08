import React from 'react'

const Total = (props) => {
    var total = props.parts.reduce((sum, part) => sum = sum + part.exercises, 0)
    console.log('total = ',total)
    return (
        <p> {['Total of ', total, ' exercises']} </p>
    )
}

const Header = (props) => <h1 key={props.key}>{props.course}</h1>

const Parts = (props) => {
    return (
    props.parts.map((part) =>
        <p key={part.id}>
          {[part.name,' ', part.exercises]}
        </p>
      )
    )
}

const Course = (props) => {
  const { course } = props
  console.log(course)
  return(
    <div>
      <Header course={course.name} />      
      <Parts parts={course.parts}/>
      <Total parts={course.parts} />
      
    </div>
  )
}

export default Course