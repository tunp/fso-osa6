import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(url, { content, votes: 0 })
    return response.data
}

const modify = async (id, modified_anecdote) => {
    const return_anecdote = await axios.put(`${url}/${id}`, modified_anecdote)
    return return_anecdote.data
}

export default { getAll, createNew, modify }
