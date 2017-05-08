import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import MainSection from './MainSection'

const render = reactDom.renderToStaticMarkup

test('<MainSection/>', nest => {
  const todoDone = { text: 'done todo text', completed: true }
  const todoUndone = { text: 'undone todo text', completed: false }
  const propsTest = {
    todos: [
      { ...todoDone, _id: 't1' },
      { ...todoUndone, _id: 't2' },
      { ...todoUndone, _id: 't3' }
    ],
    actions: {
      completeAll: () => {},
      editTodo: () => {},
      completeTodo: () => {},
      deleteTodo: () => {}
    }
  }
  const todosDone = [
      { ...todoDone, _id: 't1' },
      { ...todoDone, _id: 't2' }
  ]

  nest.test('.renders', assert => {
    const props = { ...propsTest }
    const el = dom.load(render(<MainSection {...props} />))('section')
    assert.true(el.is('section'), 'in a <section>')
    assert.true(el.hasClass('main'), 'with class \'main\'')
    assert.true(el.children('footer'), 'with a <footer>')
    assert.end()
  })
  nest.test('.renders the <section> with ToggleAll', assert => {
    const props = { ...propsTest }
    const el = dom.load(render(<MainSection {...props} />))('input')
    assert.true(el.is('input'), 'as <input>')
    assert.equals(el.attr('type'), 'checkbox', 'of type \'checkbox\'')
    assert.true(el.hasClass('toggle-all'), 'with class \'toggle-all\'')
    assert.false(el.prop('checked'), 'unchecked unless all are completed')
    assert.end()
  })
  nest.test('.ToggleAll', assert => {
    const props = { ...propsTest, todos: todosDone }
    const el = dom.load(render(<MainSection {...props} />))('input')
    assert.true(el.prop('checked'), 'checked when all are completed')
    assert.end()
  })
  nest.test('.a list of <TodoItem/>', assert => {
    const props = { ...propsTest }
    const el = dom.load(render(<MainSection {...props} />))('ul')
    assert.true(el.is('ul'), 'as <ul>')
    assert.true(el.hasClass('todo-list'), 'of class \'todo-list\'')
    assert.equal(el.children('li').has('div').length, 3,
      'containing all todos as <li>')
    assert.end()
  })
})
