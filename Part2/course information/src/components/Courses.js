import React from 'react'

const Header = (props) => <h2 key={props.key}>{props.course}</h2>

const Parts = (props) => {
    return (
    props.parts.map((part) =>
        <p key={part.id}>
          {[part.name,' ', part.exercises]}
        </p>
      )
    )
}

const Total = (props) => {
    var total = props.parts.reduce((sum, part) => sum = sum + part.exercises, 0)
    return (
        <p> {['Total of ', total, ' exercises']} </p>
    )
}

const Courses = (props) => {
    const { courses } = props
    console.log(courses)
    return(
      <div>
        <h1>Web development curriculum</h1>
        <Header course={courses[0].name} />
        <Parts parts={courses[0].parts} />
        <Total parts={courses[0].parts} />
        <Header course={courses[1].name} />
        <Parts parts={courses[1].parts} />
        <Total parts={courses[1].parts} />
      </div>
    )
  }

export default Courses