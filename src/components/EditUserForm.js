import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

import { updateUser, updateUserAsync } from "../features/users/usersSlice";

const EditUserForm = ({ showEdit, handleCloseEdit, handleChange, state }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: state.name,
        email: state.email,
        id: state.id,
      }),
      updateUserAsync({ name: state.name, email: state.email, id: state.id })
    );
    handleCloseEdit();
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
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
              onClick={handleCloseEdit}
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

export default EditUserForm;
