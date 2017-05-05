import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import Footer from './Footer'

const render = reactDom.renderToStaticMarkup

test('Footer', nest => {
  const defaultProps = {
    activeCount: 0,
    completedCount: 0,
    filter: '',
    onClearCompleted: () => {},
    onShow: () => {}
  }

  nest.test('.TodoCount', nest => {
    nest.test('..with no active items', assert => {
      const props = { ...defaultProps, activeCount: 0 }
      const el = dom.load(render(<Footer {...props} />))('.todo-count')
      assert.equal(el.text(), 'No items left', 'must render \'No items left\'')
      assert.end()
    })
    nest.test('..with 1 active item', assert => {
      const props = { ...defaultProps, activeCount: 1 }
      const el = dom.load(render(<Footer {...props} />))('.todo-count')
      assert.equal(el.text(), '1 item left', 'must render \'1 item left\'')
      assert.end()
    })
    nest.test('..with more than one active items', assert => {
      const props = { ...defaultProps, activeCount: 42 }
      const el = dom.load(render(<Footer {...props} />))('.todo-count')
      assert.equal(el.text(), '42 items left', 'must render \'<n> items left\'')
      assert.end()
    })
  })

  nest.test('.filter button list', assert => {
    const props = { ...defaultProps, filter: 'show_active' }

    const list = dom.load(render(<Footer {...props} />))('.filters')

    assert.equal(list.find('a').eq(0).text(), 'All', 'must begin with \'All\'')
    assert.equal(list.find('a').eq(1).text(), 'Active', 'must contain \'Active\'')
    assert.equal(list.find('a').eq(2).text(), 'Completed', 'must end with \'Completed\'')
    assert.equal(list.find('.selected').text(), 'Active', 'must render selected from {props.filter}')
    assert.end()
  })

  nest.test('.Clear button', nest => {
    nest.test('..with no completed items', assert => {
      const props = { ...defaultProps, completedCount: 0 }
      const el = dom.load(render(<Footer {...props} />))('.clear-completed')
      assert.equal(el.html(), null, 'must not render')
      assert.end()
    })
    nest.test('..with 1 completed item', assert => {
      const props = { ...defaultProps, completedCount: 1 }
      const el = dom.load(render(<Footer {...props} />))('.clear-completed')
      assert.equal(el.html(), 'Clear completed', 'must render')
      assert.end()
    })
  })
})
