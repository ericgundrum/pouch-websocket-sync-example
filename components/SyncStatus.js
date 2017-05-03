import React, { Component } from 'react'

class SyncStatus extends Component {

  render () {
    const { text } = this.props.status
    return (
      <p style={{padding: '1em'}}>
        syncStatus: {text}
      </p>
    )
  }
}

export default SyncStatus
