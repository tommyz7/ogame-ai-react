import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Recources from './Recources'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import buildings from '../static/images/buildings_states.png'
import facilities from '../static/images/facilities.png'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  metal_mine: {
    backgroundPosition: "-100px 0",
  },
  crystal_mine: {
    backgroundPosition: "-400px 0",
  },
  deuterium_synthesizer: {
    backgroundPosition: "-300px 0",
  },
  solar_plant: {
    backgroundPosition: "-200px 0",
  },
  robotics_factory: {
    backgroundPosition: '0 -0',
  },
  alliance_depot: {
    backgroundPosition: '-200px -0',
  },
  shipyard: {
    backgroundPosition: '-300px -0',
  },
  research_lab: {
    backgroundPosition: '-100px -0',
  },
  card: {
    display: 'flex',
    margin: 10
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 100,
    height: 100,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 10
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 16,
  },
  switch: {
    display: 'inline'
  },
});

function forHumans ( seconds ) {
    var levels = [
        [Math.floor(seconds / 31536000), 'years'],
        [Math.floor((seconds % 31536000) / 86400), 'days'],
        [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
        [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
        [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
    ];
    var returntext = '';

    for (var i = 0, max = levels.length; i < max; i++) {
        if ( levels[i][0] === 0 ) continue;
        returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length-1): levels[i][1]);
    };
    return returntext.trim();
}

class Building extends React.Component {
  state = {
    collapsed: false,
    img: buildings,
    building_types: ['metal_mine', 'crystal_mine', 'deuterium_synthesizer', 'solar_plant'],
    facilities_types: ['robotics_factory', 'shipyard', 'research_lab', 'alliance_depot'],
  };

  handleChange = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };

  componentDidMount = () => {
    if(this.props.details.collapsed !== undefined) {
      let set = function(_this) {
        _this.setState(state => ({ collapsed: _this.props.details.collapsed }))
      }
      setTimeout(set, 3000, this);
    }
    if (this.state.building_types.includes(this.props.details.type)) {
      this.setState({img: buildings})
    }
    if (this.state.facilities_types.includes(this.props.details.type)) {
      this.setState({img: facilities})
    }
  }

  deleteDOM = () => {
    if (this.props.onDelete !== undefined) {
      return <IconButton onClick={this.props.onDelete.bind('', this.props.details.id)} aria-label="Delete" >
        <DeleteIcon fontSize="small" />
      </IconButton>
    } 
  }

  render() {
    const { classes } = this.props;
    const { collapsed } = this.state;
    

    return (
      <Collapse in={!collapsed} collapsedHeight="70px">
        <Card className={classes.card}>
          <CardMedia
            className={`${classes.cover} ${classes[this.props.details.type]}`}
            image={this.state.img}
            title={this.props.details.title}
          />
          <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography align="left" variant="subtitle1">
                  {this.props.details.title} <Switch collapsed={collapsed} onChange={this.handleChange} aria-label="Collapse" />
                  <Chip className={classes.chip} label={`Level ${this.props.details.level}`} /> 
                  {this.deleteDOM()}
                </Typography>
                <Typography align="left" variant="body1" color="textSecondary">
                  Production Duration: {forHumans(this.props.details.production_duration)}
                </Typography>
                <Divider light />
                <Typography align="left" variant="body1" color="textSecondary">
                  Available to build in: {forHumans(this.props.details.available_to_build_in)}
                </Typography>
                <Divider light />
                <Typography align="left" variant="body1" color="textSecondary">
                  Resources required:
                </Typography>
                <Recources metal="2.33m" crystal="10.145k" deuterium="998k" energy={this.props.details.energy_needed} />
              </CardContent>
          </div>
        </Card>
      </Collapse>
    );
  }
}

Building.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Building);
