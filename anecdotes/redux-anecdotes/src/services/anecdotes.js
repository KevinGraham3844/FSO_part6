import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getSingleAnecdote = async id => {
    const specificIdUrl = `${baseUrl}/${id}`
    const response = await axios.get(specificIdUrl)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async updatedObject => {
    const specificIdUrl = `${baseUrl}/${updatedObject.id}`

    console.log(updatedObject)
    const response = await axios.put(specificIdUrl, updatedObject)
    return response.data
}

export default { 
    getAll,
    createNew,
    updateAnecdote,
    getSingleAnecdote 
}