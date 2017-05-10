import test from 'tape'
import { SET_SYNC_STATE } from '../constants/ActionTypes'
import syncState from './syncState'

test('reducer syncState', assert => {
  const testAction = { type: 'test action', text: 'test text' }
  const testState = { text: 'test state' }
  const initialState = { text: 'unknown' }

  assert.deepEqual(syncState({...testState}, {...testAction}), {...testState},
    'returns supplied state when action is not SET_SYNC_STATE')
  assert.deepEqual(syncState(undefined, {...testAction}), {...initialState},
    'returns initial state when no state is supplied and action is not SET_SYNC_STATE')
  assert.deepEqual(syncState(
    {...testState},
    { type: SET_SYNC_STATE, text: 'action text' }),
    { text: 'action text' },
    'returns {text: action.text} when action is SET_SYNC_STATE')

  assert.end()
})
