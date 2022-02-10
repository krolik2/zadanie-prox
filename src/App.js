import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import Users from "./features/users/Users";
import AddUserForm from "./components/AddUserForm";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4 mb-5">Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card border="light">
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  <h2>User List</h2>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button onClick={handleShowAdd}>Add New User</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Users />
              <AddUserForm showAdd={showAdd} handleCloseAdd={handleCloseAdd} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
