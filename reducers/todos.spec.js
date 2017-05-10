import test from 'tape'
import { ADD_TODO, INSERT_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import rd from './todos'

test('reducer todos', nest => {
  const testTodo = { _id: 'tt id', text: 'tt text', completed: false }
  const testAction = { type: 'test action', id: 'test id', text: 'test text', todo: testTodo }
  const testState = [ { _id: 'tt1', text: 'tt1 text', completed: false } ]
  const initialState = []

  nest.test('by default', assert => {
    assert.deepEqual(rd({...testState}, {...testAction}), {...testState},
      'returns supplied state when action is unrecognized')
    assert.deepEqual(rd(undefined, {...testAction}), {...initialState},
      'returns initial state when no state is supplied and action is unrecognized')
    assert.end()
  })
  nest.test('ADD_TODO', assert => {
    const st = rd([...testState], { type: ADD_TODO, text: 'action text' })
    const td = st[0]
    assert.ok(td._id && td.completed === false, 'creates a new, undone todo')
    assert.is(td.text, 'action text', 'creates new todo with supplied text')
    assert.true(st.length === 2, 'prepends new todo to supplied state')
    assert.deepEqual(st[1], testState[0], 'does not alter supplied state')
    assert.end()
  })
  nest.test('INSERT_TODO', assert => {
    const st = rd([...testState], {type: INSERT_TODO, todo: {...testTodo}})
    assert.deepEqual(st[0], testTodo, 'prepends supplied todo to state')
    assert.deepEqual(st[1], testState[0], 'does not alter other todos')
    assert.end()
  })
  nest.test('DELETE_TODO', assert => {
    const st = rd([...testState, {...testTodo}], {type: DELETE_TODO, id: 'tt1'})
    assert.true(st.length === 1, 'removes completed todos from state')
    assert.deepEqual(st[0], testTodo, 'does not alter other todos')

    const st2 = rd([...testState], {type: DELETE_TODO, id: 'unfindable id'})
    assert.deepEqual(st2, testState, 'changes nothing when supplied id is not in state')
    assert.end()
  })
  nest.test('EDIT_TODO', assert => {
    const alteredTodo = {_id: testTodo._id, completed: true, text: 'new text'}
    const st = rd(
      [...testState, {...testTodo}],
      {type: EDIT_TODO, id: alteredTodo._id, text: alteredTodo.text})
    assert.equal(st[1].text, alteredTodo.text, 'alters existing todo text to match supplied')
    assert.ok(st[1].completed === testTodo.completed, 'does not alter other properties')
    assert.deepEqual(st[0], testState[0], 'does not alter other todos')

    const st2 = rd(testState, {type: EDIT_TODO, _id: 'unfindable', text: '-?-'})
    assert.deepEqual(st2, testState, 'changes nothing when supplied id is not in state')
    assert.end()
  })
  nest.test('UPDATE_TODO', assert => {
    const alteredTodo = {_id: testTodo._id, completed: true, text: 'new text'}
    const st = rd(
      [...testState, {...testTodo}], {type: UPDATE_TODO, todo: {...alteredTodo}})
    assert.deepEqual(st[1], alteredTodo, 'alters existing todo to match supplied')
    assert.deepEqual(st[0], testState[0], 'does not alter other todos')

    const st2 = rd(testState, {type: UPDATE_TODO, todo: {...alteredTodo}})
    assert.deepEqual(st2, testState, 'changes nothing when supplied id is not in state')
    assert.end()
  })
  nest.test('COMPLETE_TODO', assert => {
    const st = rd([...testState, {...testTodo}], {type: COMPLETE_TODO, id: 'tt1'})
    assert.ok(st[0].completed, 'marks specified todo completed')
    assert.ok(!st[1].completed, 'does not alter other todos')

    const st2 = rd([...testState], {type: COMPLETE_TODO, id: 'unfindable id'})
    assert.deepEqual(st2, testState, 'changes nothing when supplied id is not in state')
    assert.end()
  })
  nest.test('COMPLETE_ALL', assert => {
    const st = rd([...testState, {...testTodo}], {type: COMPLETE_ALL})
    assert.ok(st[0].completed && st[1].completed, 'marks all todos completed')
    assert.end()
  })
  nest.test('CLEAR_COMPLETED', assert => {
    const st = rd([{...testState[0], completed: true}, {...testTodo}], {type: CLEAR_COMPLETED})
    assert.ok(st.length === 1, 'removes completed todos from state')
    assert.deepEqual(st[0], testTodo, 'leaves only undone todos in state')
    assert.end()
  })
})
