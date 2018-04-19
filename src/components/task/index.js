import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import List from '../list';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { createTask, deleteTask, updateTask } from '../../actions';
import './index.css';

class Task extends Component {
  constructor(props) {
    super(props);
  }

  delTask = (evnt, key, menuItem) => {
    let itemClickedText = key.props.primaryText;
    if ( itemClickedText === 'Edit' ) {
      this.props.handleUpdate();
      // updateTask(this.props.boardName, this.props.listName, this.props._id, this.props.taskInput);
    }
    else {
      deleteTask(this.props.boardName, this.props.listName, this.props._id );
    }
  }
  render() {
    let { content } = this.props;
    
    return (
      <Card>
        <CardText>
          <span style={ { padding: '5px 0' } }>{ content }</span>
          <IconMenu
            style={ { float: 'right' } }
            iconButtonElement={<MoreVertIcon />}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onItemClick={ this.delTask }
          >
            <MenuItem primaryText="Edit" />
            <MenuItem primaryText="Delete" />
          </IconMenu>
          
        </CardText>
      </Card>
    );
  }
}

export default Task;