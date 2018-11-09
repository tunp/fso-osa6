import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                      this.props.anecdoteVoting(anecdote)
                      this.props.notify(`you voted '${anecdote.content}'`, 5000)
                  }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes.filter(a => a.content.indexOf(filter) !== -1).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
    }
}

const mapDispatchToProps = {
    anecdoteVoting,
    notify
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
