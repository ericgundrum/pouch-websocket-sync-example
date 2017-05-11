import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import SyncStatus from './SyncStatus'

test('<SyncStatus/> renders status text from props.status', ck => {
  const expected = 'test status text'
  const props = { status: {text: expected} }
  const actual = skin.shallowRender(<SyncStatus {...props} />).text()
  ck.ok(actual.endsWith(expected))
  ck.end()
})
