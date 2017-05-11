import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import MainSection from './MainSection'
import { SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

let spied
const todoDone = { text: 'done todo text', completed: true }
const todoUndone = { text: 'undone todo text', completed: false }
const todosDone = [
    { ...todoDone, _id: 't1' },
    { ...todoDone, _id: 't2' }
]
const propsNone = {
  todos: [],
  actions: {
    completeAll: () => { spied = 'completeAll' },
    clearCompleted: () => { spied = 'clearCompleted' },
    editTodo: () => {},
    completeTodo: () => {},
    deleteTodo: () => {}
  }
}
const propsMix = {
  ...propsNone,
  todos: [
    { ...todoDone, _id: 't1' },
    { ...todoUndone, _id: 't2' },
    { ...todoUndone, _id: 't3' }
  ]
}

test('<MainSection/> renders in a <footer> and a <section> with class \'main\'', ck => {
  const tree = skin.shallowRender(<MainSection {...propsMix} />)
  ck.is(tree.type, 'section')
  ck.is(tree.props.className, 'main')
  ck.ok(tree.subTree('Footer'))
  ck.end()
})
test('<MainSection/> <footer> onClearCompleted() calls clearCompleted when a todo is done', ck => {
  spied = undefined
  skin.shallowRender(<MainSection {...propsMix} />).subTree('Footer').props.onClearCompleted()
  ck.is(spied, 'clearCompleted', 'spied')
  ck.end()
})
test('<MainSection/> <footer> onClearCompleted() skips clearCompleted when todos is empty', ck => {
  spied = undefined
  const props = { ...propsMix, todos: [todoUndone] }
  skin.shallowRender(<MainSection {...props} />).subTree('Footer').props.onClearCompleted()
  ck.is(spied, undefined)
  ck.end()
})
test('<MainSection/> <footer> onShow() changes the filter state', ck => {
  const tree = skin.shallowRender(<MainSection {...propsMix} />)
  console.log('SHOW_ALL length', tree.everySubTree('TodoItem').length)
  ck.is(tree.everySubTree('TodoItem').length, 3, 'SHOW_ALL count')
  tree.subTree('Footer').props.onShow(SHOW_ACTIVE)
  tree.reRender(propsMix)
  ck.is(tree.everySubTree('TodoItem').length, 2, 'SHOW_ACTIVE count')
  tree.subTree('Footer').props.onShow(SHOW_COMPLETED)
  tree.reRender(propsMix)
  ck.is(tree.everySubTree('TodoItem').length, 1, 'SHOW_COMPLETED count')
  ck.end()
})
test('<MainSection/> skips <footer> when todos is empty', ck => {
  const tree = skin.shallowRender(<MainSection {...propsNone} />).subTree('Footer')
  ck.is(tree, false, 'no footer')
  ck.end()
})
test('<MainSection/> skips toggle-all checkbox when todos is empty', ck => {
  const tree = skin.shallowRender(<MainSection {...propsNone} />).subTree('.toggle-all')
  ck.is(tree, false, 'no items')
  ck.end()
})
test('<MainSection/> renders toggle-all checkbox unckecked unless all are completed', ck => {
  const tree = skin.shallowRender(<MainSection {...propsMix} />).subTree('.toggle-all')
  ck.is(tree.type, 'input')
  ck.is(tree.props.type, 'checkbox')
  ck.is(tree.props.checked, false, 'unchecked')
  ck.end()
})
test('<MainSection/> renders toggle-all checkbox ckecked when all are completed', ck => {
  const props = { ...propsMix, todos: todosDone }
  const tree = skin.shallowRender(<MainSection {...props} />).subTree('.toggle-all')
  ck.is(tree.props.checked, true, 'checked')
  ck.end()
})
test('<MainSection/> toggle-all checkbox onChange() calls props.completeAll', ck => {
  const expected = 'completeAll'
  spied = undefined
  const tree = skin.shallowRender(<MainSection {...propsMix} />).subTree('.toggle-all')
  tree.props.onChange()
  ck.is(spied, expected, 'spied')
  ck.end()
})
test('<MainSection/> renders <TodoItem/> list of class \'todo-list\'', ck => {
  const tree = skin.shallowRender(<MainSection {...propsMix} />).subTree('.todo-list')
  ck.is(tree.everySubTree('TodoItem').length, propsMix.todos.length)
  ck.end()
})
