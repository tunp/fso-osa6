import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    var show = this.props.notifications.shown;
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: show ? '' : 'none'
    }
    return (
      <div style={style}>
        {this.props.notifications.msg}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
