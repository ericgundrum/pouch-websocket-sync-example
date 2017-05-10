import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import TodoItem from './TodoItem'

const render = reactDom.renderToStaticMarkup

test('<TodoItem/>', nest => {
  const defaultProps = {
    todo: {
      _id: 'todo_id',
      text: 'todo text',
      completed: false
    },
    editTodo: () => {},
    completeTodo: () => {},
    deleteTodo: () => {}
  }

  nest.test('.renders a completed todo', assert => {
    const props = { ...defaultProps, todo: { _id: 'id', text: 't', completed: true } }
    const el = dom.load(render(<TodoItem {...props} />))('li')
    assert.true(el.is('li'), 'in a <li>')
    assert.true(el.hasClass('completed'), 'with class \'completed\'')
    assert.end()
  })
  nest.test('.renders a not completed todo', assert => {
    const props = { ...defaultProps, todo: { _id: 'id', text: 't', completed: false } }
    const el = dom.load(render(<TodoItem {...props} />))('li')
    assert.true(el.is('li'), 'in a <li>')
    assert.false(el.hasClass('completed'), 'with class \'completed\'')
    assert.end()
  })
  nest.test('.when not editing renders', assert => {
    const props = { ...defaultProps }
    const el = dom.load(render(<TodoItem {...props} />))('div')
    assert.true(el.hasClass('view'), 'a \'<div>\' of class \'view\'')
    assert.true(el.children('input').hasClass('toggle'),
      'an \'<input>\' of class \'toggle\'')
    assert.equals(el.children('input').attr('type'), 'checkbox',
      'an \'<input>\' of type \'checkbox\'')
    assert.equals(el.children('label').text(), 'todo text',
      'a \'<label>\' with text \'todo text\'')
    assert.true(el.children('button').hasClass('destroy'),
      'a \'<button>\' of class \'destroy\'')
    assert.end()
  })
  nest.comment('.when editing, should render a <TodoTextInput/>', assert => {
    assert.end()
  })
})
