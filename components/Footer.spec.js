import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

let spied
const propsNull = {
  activeCount: 0,
  completedCount: 0,
  filter: '',
  onClearCompleted: () => { spied = 'onClearCompleted' },
  onShow: (f) => { spied = f }
}

test('<Footer/> renders as <footer> with class \'footer\'', ck => {
  const tree = skin.shallowRender(<Footer {...propsNull} />)
  ck.is(tree.type, 'footer')
  ck.is(tree.props.className, 'footer')
  ck.end()
})
test('<Footer/> TodoCount, when no active items, renders \'No items left\'', ck => {
  const tree = skin.shallowRender(<Footer {...propsNull} />)
  ck.is(tree.subTree('.todo-count').text(), 'No items left')
  ck.end()
})
test('<Footer/> TodoCount, when 1 active item, renders \'1 item left\'', ck => {
  const props = { ...propsNull, activeCount: 1 }
  const tree = skin.shallowRender(<Footer {...props} />)
  ck.is(tree.subTree('.todo-count').text(), '1 item left')
  ck.end()
})
test('<Footer/> TodoCount, when multiple active items, renders \'<n> items left\'', ck => {
  const props = { ...propsNull, activeCount: 42 }
  const tree = skin.shallowRender(<Footer {...props} />)
  ck.is(tree.subTree('.todo-count').text(), '42 items left')
  ck.end()
})
test('<Footer/> Filter List renders with 3 links; props.filter link selected', ck => {
  const props = { ...propsNull, filter: 'show_active' }
  const tree = skin.shallowRender(<Footer {...props} />).subTree('.filters')
  ck.is(tree.props.children[0].key, SHOW_ALL)
  ck.is(tree.props.children[1].key, SHOW_ACTIVE)
  ck.is(tree.props.children[2].key, SHOW_COMPLETED)
  ck.is(tree.subTree('.selected').props.children, 'Active')
  ck.end()
})
test('<Footer/> Filter List click a link calls onClearCompleted with filter', ck => {
  spied = undefined
  const tree = skin.shallowRender(<Footer {...propsNull} />).subTree('.filters')
  tree.props.children[2].props.children.props.onClick()
  ck.is(spied, SHOW_COMPLETED, 'spied')
  ck.end()
})
test('<Footer/> Clear button renders when at least one item is completed', ck => {
  const props = { ...propsNull, completedCount: 1 }
  const tree = skin.shallowRender(<Footer {...props} />)
  ck.is(tree.subTree('.clear-completed').text(), 'Clear completed')
  ck.end()
})
test('<Footer/> Clear button does not render when no items are completed', ck => {
  const props = { ...propsNull }
  const tree = skin.shallowRender(<Footer {...props} />)
  ck.is(tree.subTree('.clear-completed'), false, 'does not exist')
  ck.end()
})
test('<Footer/> Clear button click calls props.onClearCompleted', ck => {
  spied = undefined
  const props = { ...propsNull, completedCount: 1 }
  const tree = skin.shallowRender(<Footer {...props} />)
  tree.subTree('.clear-completed').props.onClick()
  ck.is(spied, 'onClearCompleted', 'spied')
  ck.end()
})
