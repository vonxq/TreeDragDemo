import React from 'react'
import { Card, Tree, Icon } from 'antd'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
const  TreeNode = Tree.TreeNode
class DragT extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedKey: '',
      treeContent: [],
    }
  }
  onDragEnter = (info) => {
    console.log(info)
  }
  // 遍历数组,找出key值与之相同的对象(节点)，执行callback函数
  // 若key值不匹配且含有children，则循环遍历
  // 否则不执行任何操作
 loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      if (item.key === key) {
        return callback(item, index, arr)
      }
      if (item.children) {
        return this.loop(item.children, key, callback)
      }
    })
  }
  onDrop = (info) => {
    // console.log(info)
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const data = this.state.treeContent
    let dragObj
    // 保存节点信息并删除节点
    this.loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })
    // 将节点插入到正确位置
    if (info.dropToGap) {
      let ar
      let i
      this.loop(data, dropKey, (item, index, arr) => {
        ar.splice(i, 0, dragObj)        
      })
    } else {
      this.loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj)
      })
    }
    this.setState({
      treeContent: data,
    })
  }
  onNodeSelect = (selectedKeys, e) => {
    console.log('select', selectedKeys, e)
    this.setState({ selectedKey: selectedKeys[0] })
  }
  // 由数组生成Tree
  getTreeNode = (treeContent) => {
    if (!treeContent || treeContent.length === 0) {
      return null
    }
    const treeNode = treeContent.map((value) => {
      if (value.id === 'all') {
        return (
          <TreeNode
            title={<div><Icon style={{ marginRight: '5px' }} type="folder-open" />{value.title}</div>}
            key={value.key}
          >
            {this.getTreeNode(value.children)}
          </TreeNode>)
      }
      return (
        <TreeNode
          draggable
          title={ <span>{value.title}</span>}
          key={value.key}
        >
          {this.getTreeNode(value.children)}
        </TreeNode>
      )
    })
    return (
      treeNode
    )
  }
  setItemKeys = (Item) => {
    Item = Object.assign({}, Item, {key: Item.id + Date.now()})
    if (!Item.children || Item.children.length === 0) {
      return Item
    }
    const children = Item.children.map((value) => {
      return this.setItemKeys(value)
    })
    const ret = Object.assign({}, Item, {children})
    return ret
  }
  // 新增Item
  addItem = (Item) => {
    // 为新加Item设置新的key
    let { treeContent } = this.state
    Item= this.setItemKeys(Item)
    console.log('new key:', Item.key)
    treeContent.push(Item)
    this.setState({ treeContent })
  }
  render () {
    const { treeContent } = this.state
    const treeNodes = this.getTreeNode(treeContent)
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div
        style={{
          float: "left",
          minHeight: '500px',
          border: '1px solid red',
          marginLeft: '50px',
          marginRight: '100px',
          padding: '20px',
        }}
      >
        我可以接收drag、且本地可以排序的
        <Tree
          draggable
          draggable
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          onSelect={this.onNodeSelect}
        >
            {treeNodes}
          </Tree>
      </div>
    )
  }
}
const spec = {
  // monitor.getItem()可获取之前dragsource在beginDrag中return的Object
  //component可直接调用组件内部方法
  drop (props, monitor, component) {
    component.addItem(monitor.getItem())
  }
}
function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}
export default DropTarget('hahaha', spec, collect)(DragT)

