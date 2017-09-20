import React from 'react'
import { Tree } from 'antd'
import PropTypes from 'prop-types'
import ListItem from './DraggableItem'
const  TreeNode = Tree.TreeNode
class DragS extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedKey: undefined,
      treeContent: [
        {
          title: '收藏中心',
          id: 'all',
          children: [
            {
              title: '收藏夹1',
              id: 'folder1',
              children: [
                {
                  title: '收藏夹1-1',
                  id: 'folder1-1',
                },
                {
                  title: '收藏夹1-2',
                  id: 'folder1-2',
                },
              ],
            },
            {
              title: '收藏夹2',
              id: 'folder2',
              children: [
                {
                  title: '收藏夹2-1',
                  id: 'folder2-1',
                },
              ],
            },
          ],
        },
      ],
    }
  }
  getTreeNode = (treeContent) => {
    if (!treeContent || treeContent.length === 0) {
      return null
    }
    const treeNode = treeContent.map((value) => {
      if (value.id === 'all') {
        return (
          <TreeNode
            title={<ListItem value={value}/>}                         
            key={value.id}
          >
            {this.getTreeNode(value.children)}
          </TreeNode>)
      }
          {/* title={<ListItem value={value}/>} */}        
      
      return (
        <TreeNode
          title={<ListItem value={value}/>}                         
          key={value.id}
        >
          {this.getTreeNode(value.children)}
        </TreeNode>
      )
    })
    return (
      treeNode
    )
  }
  render () {
    const { treeContent } = this.state
    const treeNodes = this.getTreeNode(treeContent)
    return (<div style={{
        float: "left",
        minHeight: '500px',
        border: '1px solid green',
        marginLeft: '100px',
        marginRight: '100px',
        padding: '20px',
      }}>
        ♘我是可以drag的
        <Tree
        key="123"
            defaultExpandedKeys={['all', 'folder1']}
          >
            {treeNodes}
          </Tree>
      </div>
    )
  }
}
export default DragS

