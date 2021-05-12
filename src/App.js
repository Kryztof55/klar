import React, { useState, useEffect } from "react";

import Jumbotron from "./components/atomos/jumbotron/jumbotron";
import Button from "./components/atomos/boton/boton";
import Input from "./components/atomos/input/input";
import Modal from "./components/organismos/modal/modal";
import Alert from "./components/moleculas/alert/alert";
import Table from "./components/organismos/table/table";
import Content from "./pages/content";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [mail, setMail] = useState();
  const [birthdate, setBirthdate] = useState();
  const [avatar, setAvatar] = useState("Defaul");
  const [resAdd, setResAdd] = useState(false);
  const [resMessage, setResMessage] = useState("Message");
  const [resTheme, setResTheme] = useState("alert alert-success");
  const [records, setRecords] = useState([]);
  const [filtrando, setFiltrando] = useState(false);
  const [recordFiltrado, setRecordFiltrado] = useState([]);
  useEffect(() => {
    peticionRecord();
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangenumber = (e) => {
    setNumber(e.target.value);
  };
  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const onChangeDate = (e) => {
    setBirthdate(e.target.value);
  };

  const onChangeUpload = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => setShow(false);
  const send = (e) => {
    e.preventDefault();
    let form = document.getElementById("addForm");

    if (
      name === undefined ||
      number === undefined ||
      mail === undefined ||
      birthdate === undefined
    ) {
      form.classList.add("was-validated");
    } else {
      const record = {
        name: name,
        number: number,
        mail: mail,
        birthdate: birthdate,
        avatar: avatar,
      };
      console.log(record);
      fetch("http://localhost:5000/records/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      })
        .then((res) => {
          console.log(res.json());
          setResAdd(true);
          setResMessage("Record added succesfully");
          peticionRecord();
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
    }
  };
  const peticionRecord = () => {
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
        setRecords(res);
        setFiltrando(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const deleteRecord = (item) => {
    fetch(`http://localhost:5000/records/${item}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        peticionRecord();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const edit = () => {
    console.log("edit");
  };
  const filtrarRecord = (e) => {
    var textFilter = e.target.value.toLowerCase();
    setFiltrando(true);
    var recordFilter = records.filter(
      (records) =>
        records.name.toLowerCase().includes(textFilter) ||
        records.number.toLowerCase().includes(textFilter) ||
        records.mail.toLowerCase().includes(textFilter)
    );
    setRecordFiltrado(recordFilter);
  };
  let userRecords = !filtrando ? records : recordFiltrado;
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
                  className="form-control mb-2"
                  placeholder="Full Name"
                  required={true}
                  onChange={onChangeName}
                />
                <Input
                  inputType="text"
                  className="form-control mb-2"
                  placeholder="Phone number"
                  required={true}
                  onChange={onChangenumber}
                />
                <Input
                  inputType="text"
                  className="form-control mb-2"
                  placeholder="Email"
                  required={true}
                  onChange={onChangeMail}
                />
                <Input
                  inputType="date"
                  className="form-control mb-2"
                  placeholder="Birth date"
                  required={true}
                  onChange={onChangeDate}
                />
                <Input
                  inputType="file"
                  className="form-control mb-2"
                  placeholder="Upload image"
                  required={false}
                  onChange={onChangeUpload}
                ></Input>
                <Button
                  typeButton="submit"
                  className="btn btn-primary d-flex align-items-center"
                  text="Guardar"
                  action={send}
                  disabled={false}
                ></Button>
              </form>
              {resAdd ?? (
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
