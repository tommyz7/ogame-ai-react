import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ActionsList from './ActionsList'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';


const getBuildings = (offset = 0) => {
    return [
        {
            id: 'metal_mine' + (offset + 10),
            level: 10,
            type: 'metal_mine', 
            title: 'Metal Mine', 
            production_duration: 653, 
            energy_needed: 11,
            available_to_build_in: 63,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'crystal_mine'+(offset+8),
            level: 8,
            type: 'crystal_mine', 
            title: 'Crystal Mine', 
            production_duration: 982, 
            energy_needed: 11,
            available_to_build_in: 27,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'deuterium_synthesizer'+(offset+6),
            level: 6,
            type: 'deuterium_synthesizer', 
            title: 'Deuterium Synthesizer', 
            production_duration: 28325, 
            energy_needed: 11,
            available_to_build_in: 837,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'solar_plant'+(offset+12),
            level: 12,
            type: 'solar_plant', 
            title: 'Solar Plant', 
            production_duration: 9382, 
            energy_needed: 11,
            available_to_build_in: 93836,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
    ]
}

const getFacilities = (offset = 0) => {
    return [
        {
            id: 'robotics_factory'+(offset+8),
            level: 8,
            type: 'robotics_factory', 
            title: 'Robotics Factory', 
            production_duration: 982, 
            energy_needed: 0,
            available_to_build_in: 27,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'shipyard'+(offset+6),
            level: 6,
            type: 'shipyard', 
            title: 'Shipyard', 
            production_duration: 28325, 
            energy_needed: 0,
            available_to_build_in: 837,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'research_lab'+(offset+12),
            level: 12,
            type: 'research_lab', 
            title: 'Research Lab', 
            production_duration: 9382, 
            energy_needed: 0,
            available_to_build_in: 93836,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
        {
            id: 'alliance_depot' + (offset + 10),
            level: 10,
            type: 'alliance_depot', 
            title: 'Alliance Depot', 
            production_duration: 653, 
            energy_needed: 0,
            available_to_build_in: 63,
            resources_needed: {metal: 60, crystal: 15, deuterium: 0},
        },
    ]
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const [removed] = source.splice(droppableSource.index, 1);
    removed.collapsed=true;
    destination.splice(droppableDestination.index, 0, removed);

    let removedCopy = Object.assign({}, removed);
    removedCopy.level++;
    removedCopy.id = removedCopy.type + removedCopy.level;
    removedCopy.production_duration+=500;
    removedCopy.resources_needed.metal*=2;
    removedCopy.resources_needed.crystal*=2;
    removedCopy.resources_needed.deuterium*=2;
    removedCopy.collapsed=false;
    source.splice(droppableSource.index, 0, removedCopy);

    const result = {};
    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;

    return result;
};

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

class ActionsContainer extends Component {
    state = {
        buildings: getBuildings(),
        facilities: getFacilities(),
        actionqueue: [],
        spacing: '16'
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        buildings: 'buildings',
        actionqueue: 'actionqueue',
        facilities: 'facilities',
    };

    getList = id => this.state[this.id2List[id]];

    sortLevels = (state, list) => {
        let levels = {}
        state[list].map((item, index) => {
            if (Array.isArray(levels[item.type])) {
                levels[item.type].push(item.level);
                levels[item.type].sort((a, b) => a - b);
            } else {
                levels[item.type] = [item.level];
            }
            return 1;
        })
        state[list].map((item, index) => {
            item.level = levels[item.type].shift()
            return 1;
        })
        return state;
    }

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        let state = {};
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            state[this.id2List[destination.droppableId]] = items;
        } else if (destination.droppableId === 'actionqueue'){
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            state[this.id2List[source.droppableId]] = result[source.droppableId];
            state[this.id2List[destination.droppableId]] = result[destination.droppableId];
        }
        if (destination.droppableId === 'actionqueue'){
            state = this.sortLevels(state, destination.droppableId);
        }
        this.setState(state);
    };

    onDelete = (id, e) => {
        let state = this.state;
        state['actionqueue'].map((item, index) => {
            if (item.id === id) {
                state['actionqueue'].splice(index, 1);
                state = this.sortLevels(state, 'actionqueue');
                this.setState(state)
            }
            return 1;
        })
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Grid item xs={5}>
                            <ActionsList title="Actions queue" droppableId="actionqueue" items={this.state.actionqueue} collapsable={true} onDelete={this.onDelete}/>
                        </Grid>
                        <Grid container xs={7}>
                            <GridList className={classes.gridList} cols={1.5}>
                                <ActionsList title="Buildings" droppableId="buildings" items={this.state.buildings} />
                                <ActionsList title="Facilities" droppableId="facilities" items={this.state.facilities} />


                                <Paper elevation={1} className={classes.paper}>
                                    <Typography variant="h5" component="h3">
                                        Research
                                    </Typography>
                                    <Typography variant="caption" component="h3">
                                        Coming soon
                                    </Typography>
                                </Paper>
                                <Paper elevation={1} className={classes.paper}>
                                    <Typography variant="h5" component="h3">
                                        Defense
                                    </Typography>
                                    <Typography variant="caption" component="h3">
                                        Coming soon
                                    </Typography>
                                </Paper>
                                <Paper elevation={1} className={classes.paper}>
                                    <Typography variant="h5" component="h3">
                                        Ships
                                    </Typography>
                                    <Typography variant="caption" component="h3">
                                        Coming soon
                                    </Typography>
                                </Paper>
                                
                                <Paper elevation={1} className={classes.paper}>
                                    <Typography variant="h5" component="h3">
                                        Missions
                                    </Typography>
                                    <Typography variant="caption" component="h3">
                                        Coming soon
                                    </Typography>
                                </Paper>
                            </GridList>
                        </Grid>
                        
                    </DragDropContext>
                </Grid>
            </div>
        );
    }
}

ActionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionsContainer);
