import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card key={props.user.email} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.user.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.user.title}{props.user.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.user.owner}
          </Typography>
        </CardContent>
        <Button variant="contained" onClick={e=>history.push(`/watch/${props.user.id}`)}>Click</Button>
      </CardActionArea>
      
    </Card>
  );
}
