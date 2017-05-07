import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import TodoTextInput from './TodoTextInput'

const render = reactDom.renderToStaticMarkup

test('TodoTextInput', nest => {
  const defaultProps = {
    editing: false,
    newTodo: true,
    placeholder: '',
    text: '',
    onSave: () => {}
  }

  nest.test('.initially renders', assert => {
    const props = { ...defaultProps, placeholder: 'p-text' }
    const el = dom.load(render(<TodoTextInput {...props} />))('input')
    assert.true(el.is('input'), 'exists')
    assert.false(el.hasClass('edit'), 'without class \'editing\'')
    assert.true(el.hasClass('new-todo'), 'with class \'new-todo\'')
    assert.equals(el.attr('type'), 'text', 'is type \'text\'')
    assert.equals(el.attr('placeholder'), 'p-text', 'with placeholder \'p-text\'')
    assert.end()
  })
  nest.test('.when editing existing renders', assert => {
    const props = { ...defaultProps, editing: true, newTodo: false, text: 'e-text' }
    const el = dom.load(render(<TodoTextInput {...props} />))('input')
    assert.true(el.hasClass('edit'), 'with class \'editing\'')
    assert.false(el.hasClass('new-todo'), 'without class \'new-todo\'')
    assert.equals(el.val(), 'e-text', 'with props \'e-text\'')
    assert.end()
  })
})
