import React from 'react'

const Header = (props) => {
  const { course } = props
  return (
    <h2 key={course.id}>{course.name}</h2>
  )
}

const Parts = (props) => {
  const { parts } = props
    return (
    parts.map((part) =>
      <p key={part.id}>
        {[part.name,' ', part.exercises]}
      </p>
      )
    )
}

const Total = (props) => {
 const { parts } = props
    var total = parts.reduce((sum, part) => sum = sum + part.exercises, 0)
    return (
      <h4> {['Total of ', total, ' exercises']} </h4>
    )
}

const Courses = (props) => {
    const { courses } = props
    console.log(courses)
    return(
      <div>
        <h1>Web development curriculum</h1>
        <Header course={courses[0]} />
        <Parts parts={courses[0].parts} />
        <Total parts={courses[0].parts} />
        <Header course={courses[1]} />
        <Parts parts={courses[1].parts} />
        <Total parts={courses[1].parts} />       
      </div>
    )
  }

export default Courses