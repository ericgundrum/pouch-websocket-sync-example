import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import TodoItem from './TodoItem'

let spied
const actions = {
  editTodo: (id, t) => { spied = {_id: id, text: t} },
  completeTodo: (id) => { spied = id },
  deleteTodo: (id) => { spied = id }
}
const undoneTodo = {
  _id: 'todo_id',
  text: 'todo text',
  completed: false
}

test('<TodoItem/> renders a completed todo as <li> with class \'completed\'', ck => {
  const props = {todo: {...undoneTodo, completed: true}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  ck.is(tree.type, 'li')
  ck.is(tree.props.className, 'completed')
  ck.end()
})
test('<TodoItem/> renders an undone todo without class \'completed\'', ck => {
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  ck.is(tree.props.className, '')
  ck.end()
})
test('<TodoItem/> renders undone todo unchecked with label and button', ck => {
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  const checkbox = tree.subTree('input')
  const label = tree.subTree('label')
  const button = tree.subTree('button')
  ck.is(checkbox.props.className, 'toggle')
  ck.is(checkbox.props.type, 'checkbox')
  ck.is(checkbox.props.checked, false)
  ck.is(label.props.children, 'todo text')
  ck.is(button.props.className, 'destroy')
  ck.end()
})
test('<TodoItem/> calls completeTodo(props.todo._id) on checkbox click', ck => {
  spied = undefined
  const expected = undoneTodo._id
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  tree.subTree('input').props.onChange()
  ck.same(spied, expected)
  ck.end()
})
test('<TodoItem/> calls deleteTodo(props.todo._id) on button click', ck => {
  spied = undefined
  const expected = undoneTodo._id
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  tree.subTree('button').props.onClick()
  ck.same(spied, expected)
  ck.end()
})
test('<TodoItem/> when editing, renders a <TodoTextInput/>', ck => {
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  const label = tree.subTree('label')
  label.props.onDoubleClick()
  tree.reRender(props)
  ck.is(tree.props.className, 'editing')
  const input = tree.subTree('TodoTextInput')
  ck.ok(input)
  ck.ok(input.props.editing)
  ck.end()
})
test('<TodoTextInput/> calls TodoItem.editTodo() with new text and stops editing', ck => {
  spied = undefined
  const expected = {_id: undoneTodo._id, text: 'new text'}
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  tree.subTree('label').props.onDoubleClick()
  tree.reRender(props)
  tree.subTree('TodoTextInput').props.onSave(expected.text)
  ck.same(spied, expected)
  tree.reRender(props)
  ck.is(tree.props.className, '')
  ck.end()
})
test('<TodoTextInput/> calls TodoItem.deleteTodo(props.todo._id) when submitted text is empty', ck => {
  spied = undefined
  const expected = undoneTodo._id
  const props = {todo: {...undoneTodo}, ...actions}
  const tree = skin.shallowRender(<TodoItem {...props} />)
  tree.subTree('label').props.onDoubleClick()
  tree.reRender(props)
  tree.subTree('TodoTextInput').props.onSave('')
  ck.same(spied, expected)
  tree.reRender(props)
  ck.is(tree.props.className, '')
  ck.end()
})
