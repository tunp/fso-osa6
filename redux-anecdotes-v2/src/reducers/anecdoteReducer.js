import anecdoteService from '../services/anecdotes'

export const anecdoteCreation = (content) => {
    return async (dispatch) => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            anecdote
        })
    }
}

export const anecdoteVoting = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.modify(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
        dispatch({ type: 'VOTE', id: anecdote.id })
    }
}

export const anecdoteInitialization = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            anecdotes
        })
    }
}

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.anecdote ]
  }

    if (action.type === 'INIT') {
        return action.anecdotes
    }

  return store
}

export default reducer
