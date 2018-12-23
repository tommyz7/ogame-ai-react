import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import resources from '../static/images/resources.png'

const styles = theme => ({
  resource: {
    width: 48,
    height: 32,
    backgroundSize: 'auto',
    borderRadius: 5,
    margin: '0 2px',
  },
  metal: {
    backgroundPosition: "0 -160px",
  },
  crystal: {
    backgroundPosition: "-48px -160px",
  },
  deuterium: {
    backgroundPosition: "-96px -160px",
  },
  energy: {
    backgroundPosition: "-144px -160px",
  },
  card: {
    display: 'flex',
    margin: 0,
    padding: 5,
    boxShadow: '0 0 0',
  },
});

function Recources(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <div>
        <CardMedia
          className={`${classes.metal} ${classes.resource}`}
          image={resources}
          title="Metal"
        />
        <Typography variant="subtitle2" color="textPrimary">
          {props.metal}
        </Typography>
      </div>
      <div>
        <CardMedia
          className={`${classes.crystal} ${classes.resource}`}
          image={resources}
          title="Crystal"
        />
        <Typography variant="subtitle2" color="textPrimary">
          {props.crystal}
        </Typography>
      </div>
      <div>
        <CardMedia
          className={`${classes.deuterium} ${classes.resource}`}
          image={resources}
          title="Deuterium"
        />
        <Typography variant="subtitle2" color="textPrimary">
          {props.deuterium}
        </Typography>
      </div>
      <div>
        <CardMedia
          className={`${classes.energy} ${classes.resource}`}
          image={resources}
          title="Energy"
        />
        <Typography variant="subtitle2" color="textPrimary">
          {props.energy}
        </Typography>
      </div>
    </Card>
  );
}

Recources.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Recources);