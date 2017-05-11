import React from 'react'
import skin from 'skin-deep'
import test from 'tape'
import TodoTextInput from './TodoTextInput'

let spied
const propsExisting = {
  editing: true,
  newTodo: false,
  placeholder: '',
  text: 'e-text',
  onSave: (t) => { spied = t }
}
const propsNew = {
  editing: false,
  newTodo: true,
  placeholder: 'p-text',
  text: '',
  onSave: (t) => { spied = t }
}

test('<TodoTextInput/> renders an auto-focus text <input> with supplied props', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsNew} />)
  ck.is(tree.type, 'input')
  ck.is(tree.props.className, 'new-todo')
  ck.is(tree.props.type, 'text')
  ck.is(tree.props.placeholder, 'p-text')
  ck.ok(tree.props.autoFocus)
  ck.end()
})
test('<TodoTextInput/>, when editing existing, renders props.value with class \'edit\'', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsExisting} />)
  ck.is(tree.props.className, 'edit')
  ck.is(tree.props.value, 'e-text')
  ck.end()
})
test('<TodoTextInput/>, when loses focus while editing existing, calls onSave with <input> value', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsExisting} />)
  spied = undefined
  tree.props.onBlur({target: {value: 'blur text'}})
  ck.is(spied, 'blur text')
  ck.end()
})
test('<TodoTextInput/>, when loses focus while editing new, does not call onSave', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsNew} />)
  spied = undefined
  tree.props.onBlur({target: {value: 'new blur text'}})
  ck.is(spied, undefined)
  ck.end()
})
test('<TodoTextInput/>, submit while editing existing, calls onSave with <input> value without newline', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsExisting} />)
  spied = undefined
  tree.props.onKeyDown({which: 13, target: {value: 'submit text\n'}})
  ck.is(spied, 'submit text')
  ck.end()
})
test('<TodoTextInput/>, submit while editing existing, does not save when `which` is not `13`', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsExisting} />)
  spied = undefined
  tree.props.onKeyDown({which: 42, target: {value: '42 text\n'}})
  ck.is(spied, undefined)
  ck.end()
})
test('<TodoTextInput/>, submit while editing new, clears state.text after onSave', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsNew} />)
  spied = undefined
  tree.props.onKeyDown({which: 13, target: {value: 'submit text\n'}})
  ck.comment('cannot check state without spy')
  ck.end()
})
test('<TodoTextInput/>, while editing, updates state.text with new value', ck => {
  const tree = skin.shallowRender(<TodoTextInput {...propsExisting} />)
  spied = undefined
  tree.props.onChange({target: {value: 'changed text'}})
  ck.comment('cannot check state without spy')
  ck.end()
})
