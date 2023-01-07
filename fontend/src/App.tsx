import { Button, InputLabel, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Api from "./api";
import { birthdaySliceActions } from "./slices/birthday-slice";

const App: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [noDateSelect, setNoDateSelect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(false);
  const [getData, setGetData] = useState<getDataType>();
  type elementType = JSX.Element[];
  const dispatch = useDispatch();
  const isDateInvalid = useSelector(
    (state: any) => state.birthday.isDateInvalid
  );
  const isUnderAge = useSelector((state: any) => state.birthday.isUnderAge);
  const isDataUpdated = useSelector(
    (state: any) => state.birthday.isDataUpdated
  );

  interface getDataType {
    date: elementType;
    month: elementType;
    year: elementType;
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 9 + 8,
        width: 100,
      },
    },
  };

  useEffect(() => {
    let dateElement: elementType = [];
    let monthElement: elementType = [];
    let yearElement: elementType = [];

    Api.get("/records")
      .then((response: any) => {
        setIsLoading(true);
        // there we can set our local storage for access_token
        // localStorage.setItem("jwt", response.access_token);

        for (let i = 1; i <= response[0]?.month.length; i++) {
          monthElement.push(
            <MenuItem value={i} key={i}>
              {i}
            </MenuItem>
          );
        }

        for (let i = 1; i <= response[0]?.date.length; i++) {
          dateElement.push(
            <MenuItem value={i} key={i}>
              {i}
            </MenuItem>
          );
        }

        for (let i = 1; i <= response[0]?.year.length; i++) {
          yearElement.push(
            <MenuItem value={response[0]?.year[i]} key={i}>
              {response[0]?.year[i]}
            </MenuItem>
          );
        }

        setIsLoading(false);
      })
      .catch(console.log);

    setGetData({
      date: dateElement,
      month: monthElement,
      year: yearElement,
    });
  }, []);

  const handleDateChange = (event: SelectChangeEvent) => {
    setDate(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!date || !month || !year) {
      setIsFormEmpty(true);
      setIsLoading(false);
      setNoDateSelect(false);
      return;
    }
    setIsFormEmpty(false);
    setNoDateSelect(false);
    setIsLoading(true);

    Api.post("/date", { date: date, month: month, year: year })
      .then((response) => {
        setIsLoading(false);
        dispatch(
          birthdaySliceActions.setBirhtDateInformation({
            isDateInvalid: response.isDateInvalid,
            isUnderAge: response.isUnderAge,
            isDataUpdated: response.isDataUpdated,
          })
        );
      })
      .catch(console.log);
  };
  return (
    <Container>
      <header className="header">
        <h1 className="text-center header-text">Welcome to Birthday checker</h1>
      </header>
      <Container>
        <main>
          <div className="main-content">
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg="3">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="date">day</InputLabel>
                    <Select
                      labelId="date"
                      id="date"
                      value={date}
                      onChange={handleDateChange}
                      label="date"
                      MenuProps={MenuProps}
                    >
                      {getData?.date}
                    </Select>
                  </FormControl>
                </Col>

                <Col lg="3">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="month">month</InputLabel>
                    <Select
                      labelId="month"
                      id="month"
                      value={month}
                      onChange={handleMonthChange}
                      label="month"
                    >
                      {getData?.month}
                    </Select>
                  </FormControl>
                </Col>
                <Col lg="2">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="year">year</InputLabel>
                    <Select
                      labelId="year"
                      id="year"
                      value={year}
                      onChange={handleYearChange}
                      label="year"
                      MenuProps={MenuProps}
                    >
                      {getData?.year}
                    </Select>
                  </FormControl>
                </Col>
                <Col lg="2" className="submit-button">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          </div>

          <Container className="main-message text-center">
            {isDataUpdated && (
              <Alert variant="success">
                <Alert.Heading>
                  Congrats your bithdate successfully store
                </Alert.Heading>
              </Alert>
            )}

            {noDateSelect && !isDataUpdated && (
              <Alert variant="primary">
                <Alert.Heading>Haven't select any date</Alert.Heading>
              </Alert>
            )}
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            )}
            {isFormEmpty && (
              <Alert variant="danger">
                <Alert.Heading>Please fill all the fields</Alert.Heading>
              </Alert>
            )}

            {isDateInvalid && (
              <Alert variant="danger">
                <Alert.Heading>Please enter a valid date</Alert.Heading>
              </Alert>
            )}

            {isUnderAge && !isDateInvalid && (
              <Alert variant="danger">
                <Alert.Heading>You are too young (under 18)</Alert.Heading>
              </Alert>
            )}
          </Container>
        </main>
      </Container>
    </Container>
  );
};

export default App;
