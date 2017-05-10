import test from 'tape'
import * as types from '../constants/ActionTypes'
import * as action from './todos'

test('action', assert => {
  const id = 'test id'
  const text = 'test text'

  assert.deepEqual(action.addTodo(text), { type: types.ADD_TODO, text },
    'addTodo() returns ADD_TODO action')
  assert.deepEqual(action.deleteTodo(id), { type: types.DELETE_TODO, id },
    'deleteTodo() returns DELETE_TODO action')
  assert.deepEqual(action.editTodo(id, text), { type: types.EDIT_TODO, id, text },
    'editTodo() returns EDIT_TODO action')
  assert.deepEqual(action.completeTodo(id), { type: types.COMPLETE_TODO, id },
    'completeTodo() returns COMPLETE_TODO action')
  assert.deepEqual(action.completeAll(), { type: types.COMPLETE_ALL },
    'completeAll() returns COMPLETE_ALL action')
  assert.deepEqual(action.clearCompleted(text), { type: types.CLEAR_COMPLETED },
    'clearCompleted() returns CLEAR_COMPLETED action')

  assert.end()
})
