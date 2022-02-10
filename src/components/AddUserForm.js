import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

import { addUser, addUserAsync } from "../features/users/usersSlice";

const AddUserForm = ({ showAdd, handleCloseAdd }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        name: state.name,
        email: state.email,
        id: Date.now(),
      }),
      addUserAsync({ name: state.name, email: state.email, id: Date.now() })
    );
    setState({ name: "", email: "" });
    handleCloseAdd();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Modal show={showAdd} onHide={handleCloseAdd}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Name:
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col>
              <Form.Control
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Col className="col-sm-4 offset-sm-1 d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-3"
              onClick={handleCloseAdd}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddUserForm;
