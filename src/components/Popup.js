import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";

const Popup = ({
  showDelete,
  handleCloseDelete,
  handleDelete,
  userData
}) => {
  ;

  const handleSubmit = e => {
    e.preventDefault();
    handleDelete(userData.id);
    handleCloseDelete();
  };

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <p>
                    Are you sure you want to delete user: {userData?.name}?
                  </p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default Popup;
