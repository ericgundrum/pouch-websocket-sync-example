import debugReport from 'debug'
import { ADD_TODO, INSERT_TODO, BATCH_INSERT_TODOS, DELETE_TODO, EDIT_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = []
const debug = debugReport('reducers/todos')

export default function todos (state = initialState, action) {
  debug('action', action)
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          _id: id(),
          completed: false,
          text: action.text
        },
        ...state
      ]

    case INSERT_TODO:
      return [
        action.todo,
        ...state
      ]

    case BATCH_INSERT_TODOS:
      return [
        ...action.todos,
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo._id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo._id === action.id
        ? Object.assign({}, todo, { text: action.text })
        : todo
      )

    case UPDATE_TODO:
      return state.map(todo =>
        todo._id === action.todo._id
          ? action.todo
          : todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo._id === action.id
          ? Object.assign({}, todo, { completed: !todo.completed })
          : todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}

function id () {
  return Math.random().toString(36).substring(7)
}
