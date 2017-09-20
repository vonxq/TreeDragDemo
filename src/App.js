import React from 'react'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import DragS from './DragS'
import DragT from './DragT'
class WebVisitTrend extends React.Component {
  render () {
    console.log('messages')
    return (
          <div>
            <DragS name="hahaha" />
            <DragT/>
          </div>
    )
  }
}
WebVisitTrend.propTypes = {
  ha: PropTypes.any,
}
export default DragDropContext(HTML5Backend)(WebVisitTrend)