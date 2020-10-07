import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'How does a project get to be a year late?... One day at a time.'
]
const Header = (props) => <h1>{props.header}</h1>
const Display = (props) => <div> {props.text} </div>

const Button = (props) => (
<button onClick={props.handleClick}>
  {props.text}
</button>  
)

function mostVotes(votes){
  var grade = votes[0]
  var index = 0
  for (var i = 1; i < votes.length; i++){
    if (votes[i] > grade ){
      grade = votes[i]
      index = i
    }
  }
  return index
}

var points = Array(anecdotes.length).fill(0)
const copy = [...points]

const App = (props) => {
  var [selected, setSelected] = useState(0) // random selection
  var [index, setIndex] = useState(0) // set the index of the anecdote with the most votes
  var [votes, setVotes] = useState(0) // updates the number of votes of the anecdote with the most votes
  return (    
    <div>
      <Header header={'Anecdote of the day'}/>
      <Display text={anecdotes[selected]}/>
      <Display text={['has ', points[selected] ,' votes']}/>
      <Button handleClick={() => {
          votes = copy[selected]
          setVotes(votes += 1)
          copy[selected] = votes
          points = [...copy]
          setIndex(mostVotes(points))
        }
      } text={'vote'}/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text={'next anecdote'}/>      
      <Header header={'Anecdote with most votes'}/>
      <Display text={anecdotes[index]} />
      <Display text={['has ', points[index], ' points']} />
    </div>
  )
}

ReactDOM.render(
<App anecdotes={anecdotes} />, document.getElementById('root')
)