import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Navbar,
  OverlayTrigger,
  Tooltip,
  Popover
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSearchQuery, UpdateData, fetchData} from "../redux/DataSlice";
function Nav() {
  const [query, setQuery] = useState("");
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const handelSearch = (e) => {
    e.preventDefault();
    console.log("handelSearch")
    if (query) {
      dispatch(setSearchQuery(query));
      dispatch(UpdateData());
      setQuery("");
    }
  };
  // get current user location
const getCurrentLocation=()=>{
  const onSuccess=(location)=>{
    let longitude = location.coords.longitude
    let latitude = location.coords.latitude
    dispatch(fetchData(`${latitude},${longitude}`))
  }
  const onFailed=()=>{
    setErr(true)
  }
navigator.geolocation.getCurrentPosition(onSuccess,onFailed)
}

const popover = (
  <Popover id="popover-basic">
    <Popover.Header className=" text-center" as="h1">Oops</Popover.Header>
    <Popover.Body className="text-danger text-center">
      Something Went Wrong Please Cheek Your Location Accessability
    </Popover.Body>
  </Popover>
);
  return (
    <Navbar collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand href="#" className="d-flex">
        <img
              alt=""
              src="../assets/sun.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-1"
            />{' '}
          <h4>Weather Forecast</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="search-form d-flex w-100" onSubmit={handelSearch}>
            <Form.Control
              type="search"
              placeholder="Enter Location"
              className=" me-2 ms-auto "
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Button onClick={handelSearch} variant="primary">
              Search
            </Button>
            <OverlayTrigger
              placement="bottom"
              overlay={err?popover:<Tooltip>Get Current Location</Tooltip>}
              
            >
              <Button variant="outline-primary" onClick={getCurrentLocation}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </Button>
            </OverlayTrigger>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;
