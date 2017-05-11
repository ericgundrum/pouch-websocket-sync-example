import React from 'react'
import reactDom from 'react-dom/server'
import test from 'tape'
import dom from 'cheerio'
import skin from 'skin-deep'

import TodoTextInput from './TodoTextInput'

const render = reactDom.renderToStaticMarkup

test('TodoTextInput', nest => {
  let saved
  const defaultProps = {
    editing: false,
    newTodo: true,
    placeholder: '',
    text: '',
    onSave: (t) => { saved = t }
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
  nest.test('.when editing existing and user changes focus', assert => {
    const props = { ...defaultProps, editing: true, newTodo: false, text: 'e-text' }
    const tree = skin.shallowRender(<TodoTextInput {...props} />).getRenderOutput()
    saved = undefined
    tree.props.onBlur({target: {value: 'blur text'}})
    assert.equal(saved, 'blur text', 'handleBlur calls onSave with <input> value')
    assert.end()
  })
  nest.test('.when editing existing and user presses return', assert => {
    const props = { ...defaultProps, editing: true, newTodo: false, text: 'e-text' }
    const tree = skin.shallowRender(<TodoTextInput {...props} />).getRenderOutput()
    console.log(tree)
    saved = undefined
    tree.props.onKeyDown({which: 13, target: {value: 'submit text\n'}})
    assert.equal(saved, 'submit text', 'handleSubmit calls onSave with <input> value trimmed of trailing newline')
    assert.end()
  })
  nest.test('.when editing new and user changes focus', assert => {
    const props = { ...defaultProps, editing: true, newTodo: true, text: 'e-text' }
    const tree = skin.shallowRender(<TodoTextInput {...props} />).getRenderOutput()
    saved = undefined
    tree.props.onBlur({target: {value: 'new blur text'}})
    assert.equal(saved, undefined, 'handleBlur does not call onSave')
    assert.end()
  })
  nest.skip('.when editing new and user presses return', assert => {
    assert.comment('skip testing state')
    assert.end()
  })
  nest.comment('cannot test state to verify handleChange without spy()')
})
