import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    marginTop: 75,
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontWeight: "bold",
  },
});

const Content = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    peticionRecord();
  }, []);
  const peticionRecord = () => {
    fetch(`http://localhost:5000/records/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            USER
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography className={classes.pos} color="textSecondary">
            {user?.name}
          </Typography>
          <Typography variant="body2" component="p">
            {user?.number}
            <br />
            {user?.mail}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Content;
