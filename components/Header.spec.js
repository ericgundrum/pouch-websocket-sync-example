import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import Header from './Header'

test('<Header/> renders as <header> with class \'header\' and title text', ck => {
  const props = {addTodo: () => {}}
  const tree = skin.shallowRender(<Header {...props} />)
  ck.is(tree.type, 'header')
  ck.is(tree.props.className, 'header')
  ck.is(tree.subTree('h1').props.children, 'todos')
  ck.end()
})
test('<Header/> renders a <TodoTextInput/> with props: `newTodo`, `onSave`, and `placeholder`', ck => {
  const props = {addTodo: () => {}}
  const tree = skin.shallowRender(<Header {...props} />).subTree('TodoTextInput')
  ck.ok(tree.props.newTodo)
  ck.ok(tree.props.onSave)
  ck.ok(tree.props.placeholder)
  ck.end()
})
test('<TodoTextInput/> onSave() calls addTodo() of <Header/>', ck => {
  let spied
  const props = {addTodo: (t) => { spied = t }}
  const tree = skin.shallowRender(<Header {...props} />).subTree('TodoTextInput')
  tree.props.onSave('new text')
  ck.is(spied, 'new text')
  spied = 'unchanged'
  tree.props.onSave('')
  ck.is(spied, 'unchanged', 'empty string does not change saved text')
  ck.end()
})
