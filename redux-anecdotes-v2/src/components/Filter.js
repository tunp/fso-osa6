import React from 'react'
import { connect } from 'react-redux'
import { filterChanging } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.filterChanging(event.target.value)
    }
    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}

const ConnectedFilter = connect(null, { filterChanging })(Filter)

export default ConnectedFilter
