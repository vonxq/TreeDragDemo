import React from 'react'
import { Card, Tree, Icon } from 'antd'
import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'
const  TreeNode = Tree.TreeNode
const spec = {
  beginDrag(props) {
    return { ...props.value }
  }
}
function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
class DraggableItem extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { connectDragSource, isDragging, value } = this.props
    return connectDragSource(
      <div style={{
        float: "left",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'move': '',
      }}>
        <div><Icon style={{ marginRight: '5px' }} type="folder-open" />{value.title}</div>
      </div>
    )
  }
}
DraggableItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}
export default DragSource('hahaha', spec, collect)(DraggableItem)

