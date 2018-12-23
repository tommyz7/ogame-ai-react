import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Building from './Building'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    width: "100%",
    height: "100%",
});


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100% !important'
  },
  gridList: {
    flexWrap: 'nowrap',
  },
});

class ActionsList extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Paper elevation={1} className={classes.paper}>
                <Typography variant="h5" component="h3">
                    {this.props.title}
                </Typography>
                <Droppable droppableId={this.props.droppableId}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.props.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                                <Building details={item} collapsable={this.props.collapsable}
                                                    onDelete={this.props.onDelete} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Paper>
        );
    }
}

ActionsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionsList);
