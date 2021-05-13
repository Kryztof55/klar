import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Boton from "../components/atomos/boton/boton";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "../components/organismos/modal/modal";
import Input from "../components/atomos/input/input";
import Alert from "../components/moleculas/alert/alert";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";

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

const Content = (props) => {
  const classes = useStyles();
  let { id } = useParams();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("undefined");
  const [number, setNumber] = useState("undefined");
  const [mail, setMail] = useState("undefined");
  const [birthday, setBirthdate] = useState("undefined");
  const [resAdd, setResAdd] = useState(false);
  const [resMessage, setResMessage] = useState("Message");
  const [resTheme, setResTheme] = useState("alert alert-success");
  const [isDisabled, setIsDisabled] = useState(true);
  let form = document.getElementById("addForm");
  const history = useHistory();
  useEffect(() => {
    requestUser();
  }, []);
  const requestUser = () => {
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
        console.log(res);
        setUser(res);
        setName(res.name);
        setNumber(res.number);
        setMail(res.mail);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const openModal = () => {
    setShow(true);
  };

  const validationForm = (e, type) => {
    let inputValue = e.target.value;
    switch (type) {
      case "name":
        setName(inputValue);
        break;
      case "number":
        setNumber(inputValue);
        break;
      case "mail":
        setMail(inputValue);
        break;
      case "date":
        setBirthdate(inputValue);
        break;
    }
    if (
      name != "Default" &&
      name.length > 2 &&
      number != "Default" &&
      number.length > 2 &&
      number.length <= 14 &&
      mail.length > 2 &&
      mail != "Default"
    ) {
      setIsDisabled(false);
      form.classList.remove("was-validated");
    } else {
      setIsDisabled(true);
      form.classList.add("was-validated");
    }
  };

  const closeModal = () => setShow(false);

  const deleteRecord = (item) => {
    fetch(`http://localhost:5000/records/${item}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setResAdd(true);
        setResMessage("User Record Deleted succesfully");
        setTimeout(() => {
          history.push(`/`);
        }, 1000);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const update = (e) => {
    const record = {
      name: name,
      number: number,
      mail: mail,
      birthday: birthday,
    };
    fetch(`http://localhost:5000/records/update/${user._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((res) => {
        console.log(res.json());
        setResAdd(true);
        setResMessage("User Record Update succesfully");
        requestUser();
        setTimeout(() => {
          closeModal();
          form.reset();
          setResAdd(false);
        }, 1000);
      })
      .catch((error) => {
        console.log("Error:", error.json());
        setResAdd(true);
        setResMessage("Error");
        setResTheme("alert alert-danger");
      });

    requestUser();
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Button
          color="primary"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.push("/")}
        >
          user List
        </Button>
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
              Phone number: {user?.number}
              <br />
              Email: {user?.mail}
              <br />
              Birth Date:{" "}
              {user?.birthday
                ? moment(user.birthday).format("l")
                : "Without Date"}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={openModal}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              onClick={() => deleteRecord(user._id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Container>
      <Modal closeModal={closeModal} show={show} header="Add User">
        <form className="mb-3" id="addForm" encType="multipart/form-data">
          <Input
            inputType="text"
            className="form-control mb-2"
            placeholder="Full Name"
            value={name}
            required={true}
            onChange={(e) => validationForm(e, "name")}
          />
          <Input
            inputType="text"
            className="form-control mb-2"
            placeholder="Phone number"
            value={number}
            required={true}
            onChange={(e) => validationForm(e, "number")}
          />
          <Input
            inputType="text"
            className="form-control mb-2"
            placeholder="Email"
            value={mail}
            required={true}
            onChange={(e) => validationForm(e, "mail")}
          />
          <Input
            inputType="date"
            className="form-control mb-2"
            placeholder="Birth date"
            onChange={(e) => validationForm(e, "date")}
          />
          <Boton
            typeButton="submit"
            className="btn btn-primary d-flex align-items-center"
            text="Update"
            action={update}
            disabled={isDisabled}
          ></Boton>
        </form>
        {resAdd && (
          <div className="container">
            <Alert theme={resTheme} text={resMessage}></Alert>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default Content;
