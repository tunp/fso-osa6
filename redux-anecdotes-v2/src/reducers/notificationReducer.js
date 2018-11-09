export const msgChanging = msg => {
    return {
      type: 'CHANGE_MSG',
      msg
    }
}

export const msgShowing = show => {
    return {
        type: show ? 'SHOW' : 'HIDE'
    }
}

export const notify = (msg, time) => {
    return async (dispatch) => {
        dispatch(msgChanging(msg))
        dispatch(msgShowing(true))
        await setTimeout(() => dispatch(msgShowing(false)), time)
    }
}

const reducer = (state = { msg: 'defalt msg', shown: false }, action) => {
    switch (action.type) {
        case 'CHANGE_MSG': return { ...state, msg: action.msg }
        case 'SHOW': return { ...state, shown: true }
        case 'HIDE': return { ...state, shown: false }
        default: return state
    }
}

export default reducer
