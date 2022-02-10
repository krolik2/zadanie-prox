import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Spinner } from "react-bootstrap";
import { BiSort } from "react-icons/bi";

import { getUsers, deleteUser, deleteUserAsync, sortUsers } from "./usersSlice";
import Popup from "../../components/Popup";
import EditUserForm from "../../components/EditUserForm";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [state, setState] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }), deleteUserAsync({ id }));
  };

  const handleShowDelete = (user) => {
    getUserData(user);
    setShowDelete(true);
  };
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowEdit = (user) => {
    setState({ name: user.name, email: user.email, id: user.id });
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const getUserData = (user) => {
    setUserData(user);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <Row className="justify-content-center flex-column align-items-center">
        {users.status === "loading" ? (
          <Col className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          <Col>
            {users.list && users.list.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th onClick={() => dispatch(sortUsers())}>
                      Username <BiSort />
                    </th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.list.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address ? user.address.city : ""}</td>
                      <td className="d-flex align-items-center justify-content-evenly">
                        <button
                          onClick={() => handleShowDelete(user)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleShowEdit(user)}
                          className="btn btn-warning"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h2>there are no more users to delete :)</h2>
            )}
          </Col>
        )}
      </Row>
      <Popup
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
        userData={userData}
      />
      <EditUserForm
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        handleChange={handleChange}
        state={state}
      />
    </>
  );
};

export default Users;
