import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import Header from './Header'

const render = reactDom.renderToStaticMarkup

test('Header', assert => {
  const defaultProps = {
    addTodo: () => {}
  }
  const props = { ...defaultProps }
  const el = dom.load(render(<Header {...props} />))('header')

  assert.ok(el.is('header'), 'exists as element \'header\'')
  assert.ok(el.hasClass('header'), 'has class \'header\'')
  assert.equal(el.children('h1').text(), 'todos', 'renders text \'todos\'')

  assert.end()
})
