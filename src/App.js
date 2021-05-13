import React, { useState, useEffect } from "react";

import Jumbotron from "./components/atomos/jumbotron/jumbotron";
import Button from "./components/atomos/boton/boton";
import Input from "./components/atomos/input/input";
import Modal from "./components/organismos/modal/modal";
import Alert from "./components/moleculas/alert/alert";
import Table from "./components/organismos/table/table";
import Content from "./pages/content";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions/actions";
import moment from "moment";

const App = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("Default");
  const [number, setNumber] = useState("Default");
  const [mail, setMail] = useState("Default");
  const [birthday, setBirthdate] = useState("");
  const [resAdd, setResAdd] = useState(false);
  const [resMessage, setResMessage] = useState("Message");
  const [resTheme, setResTheme] = useState("alert alert-success");
  const [filtrando, setFiltrando] = useState(false);
  const [recordFiltrado, setRecordFiltrado] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  let form = document.getElementById("addForm");
  const dispatch = useDispatch();

  useEffect(() => {
    requestUser();
  }, []);

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
      default:
        setName("Default");

        setNumber("Default");

        setMail("Default");

        setBirthdate("Default");
    }
    if (
      name !== "Default" &&
      name.length > 2 &&
      number !== "Default" &&
      number.length > 2 &&
      number.length <= 14 &&
      mail.length > 2 &&
      mail !== "Default"
    ) {
      setIsDisabled(false);
      form.classList.remove("was-validated");
    } else {
      setIsDisabled(true);
      form.classList.add("was-validated");
    }
  };

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    form.reset();
    form.classList.remove("was-validated");
    setShow(false);
  };
  const send = (e) => {
    let form = document.getElementById("addForm");
    e.preventDefault();
    const record = {
      name: name,
      number: number,
      mail: mail,
      birthday: birthday,
    };
    fetch("http://localhost:5000/records/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((res) => {
        setResAdd(true);
        setResMessage("User Record added succesfully");
        requestUser();
        setTimeout(() => {
          closeModal();
          form.reset();
          form.classList.remove("was-validated");
          setResAdd(false);
          setName("Default");
          setNumber("Default");
          setMail("Default");
          setBirthdate("");
        }, 1000);
      })
      .catch((error) => {
        console.log("Error:", error.json());
        setResAdd(true);
        setResMessage("Error");
        setResTheme("alert alert-danger");
      });
  };
  const requestUser = () => {
    fetch("http://localhost:5000/records", {
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
        dispatch(actions.setUsers(res));
        setFiltrando(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const usersState = useSelector((state) => state.usersReducer.users);
  if (!usersState) {
    return <h1>Loading...</h1>;
  }
  const filtrarRecord = (e) => {
    var textFilter = e.target.value.toLowerCase();
    setFiltrando(true);
    var recordFilter = usersState.filter(
      (records) =>
        records.name.toLowerCase().includes(textFilter) ||
        records.number.toLowerCase().includes(textFilter)
    );
    setRecordFiltrado(recordFilter);
  };

  let userRecords = !filtrando ? usersState : recordFiltrado;
  let yesterday = moment().subtract(1, "days").format().split("T")[0];
  return (
    <Router>
      <Switch>
        <Route path="/content/:id">
          <Content />
        </Route>
        <Route path="/">
          <div className="App">
            <Jumbotron className="jumbotron jumbotron-fluid">
              <h1 className="display-4">Klar Homework Assignment</h1>
              <p className="lead">User records</p>
              <Input
                inputType="search"
                className="form-control"
                placeholder="Search..."
                required={false}
                onChange={filtrarRecord}
              />
            </Jumbotron>
            <section className="container mb-5">
              <div className="d-flex">
                <Button
                  typeButton="button"
                  className="btn btn-primary d-flex align-items-center"
                  text="Add"
                  action={openModal}
                >
                  <i className="material-icons">add</i>
                </Button>
              </div>
            </section>
            <section className="container mb-5">
              <div className="grid-cards">
                <Table rows={userRecords}></Table>
              </div>
            </section>

            <Modal closeModal={closeModal} show={show} header="Add User">
              <form className="mb-3" id="addForm" encType="multipart/form-data">
                <Input
                  inputType="text"
                  maxLength="200"
                  className="form-control mb-2"
                  placeholder="Full Name"
                  required={true}
                  onChange={(e) => validationForm(e, "name")}
                />
                <Input
                  inputType="number"
                  max="14"
                  className="form-control mb-2"
                  placeholder="Phone number max 14 "
                  required={true}
                  onChange={(e) => validationForm(e, "number")}
                />
                <Input
                  inputType="email"
                  maxLength="255"
                  className="form-control mb-2"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => validationForm(e, "mail")}
                />
                <Input
                  max={yesterday}
                  inputType="date"
                  className="form-control mb-2"
                  placeholder="Birth date"
                  required={false}
                  onChange={(e) => validationForm(e, "date")}
                />
                <Button
                  typeButton="submit"
                  className="btn btn-primary d-flex align-items-center"
                  text="Add"
                  action={send}
                  disabled={isDisabled}
                ></Button>
              </form>
              {resAdd && (
                <div className="container">
                  <Alert theme={resTheme} text={resMessage}></Alert>
                </div>
              )}
            </Modal>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
