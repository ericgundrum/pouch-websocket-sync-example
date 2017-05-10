import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'

import SyncStatus from './SyncStatus'

const render = reactDom.renderToStaticMarkup

test('SyncStatus', assert => {
  const props = {
    status: {text: 'test status text'}
  }
  const re = new RegExp(props.status.text, 'g')

  const el = <SyncStatus {...props} />
  const $ = dom.load(render(el))
  const output = $('p').text()
  const actual = re.test(output)
  const expected = true

  assert.equal(actual, expected,
    'must render syncStatus text from props.status')

  assert.end()
})
