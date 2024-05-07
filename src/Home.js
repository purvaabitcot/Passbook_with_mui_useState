import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { cyan, deepOrange, grey, pink } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const defaultForm = {
    t_type: "",
    amount: "",
    remark: "",
    balance: 0
  };

  const [form, setForm] = useState(defaultForm);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    let newamount = 0;
    
        if ((data.length+1)%6 === 0) {
          for (var i = 0; i <= 4; i++) {
            newamount = newamount + data[i].balance;
          }

          console.log("New Amount is :" + newamount);
          let avgAmount = ((newamount / data?.length) * 3) / 100;
          console.log("Average amount is : " + avgAmount, data);
          let newBalanceAmount = data[data.length - 1]?.balance + avgAmount;
          console.log("New amount : " + newBalanceAmount);
          const obj = {
            t_type: "credit",
            amount: avgAmount,
            remark: "Interest Credit",
            balance: newBalanceAmount,
          };
          setData([...data, obj]);
        }
  
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  //for add details

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.amount === "" || form.balance === " " || form.remark === "") {
      toast.info("All fields are mandatory");
      return;
    }
    let newBal = 0;

    if (form.t_type === "credit") {
      newBal =
        parseInt(data[data.length - 1]?.balance) + parseInt(form.amount) ||
        parseInt(form.amount);
        toast.success("Amount Credited Succusfully")
    } else {
      newBal =
        parseInt(data[data.length - 1]?.balance) - parseInt(form.amount) ||
        parseInt(form.amount);
        toast.info("Amount debited Succusfully")
    }

    if (parseInt(newBal) >= 0) {
      const obj = {
        ...form,
        balance: newBal,
      };
      setData([...data, obj]);
      localStorage.setItem("value", JSON.stringify([...data, obj]));

      setForm(defaultForm);
      
    } else {
      toast.info("insufficient Balance");
      return;
    }
  };
  //for clear Data
  const HandleClear = (event) => {
    event.preventDefault();
    setForm(defaultForm);
  };
  //for load Data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("value")) || [];
    setData(storedData);
  }, []);

  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          component={Box}
          p={4}
          position={"relative"}
          top={50}
          border={1}
          borderColor={pink[200]}
          borderRadius={10}
          maxWidth={700}
          margin={"auto"}
        >
          <Typography
            style={{
              backgroundColor: cyan[100],
              color: deepOrange[300],
              textAlign: "center",
              fontFamily: "fantasy",
              padding: 10,
              borderRadius: 5,
            }}
            variant="h4"
          >
            ADD DETAILS HERE!
          </Typography>
          <Box
            style={{ backgroundColor: grey[200] }}
            boxShadow={5}
            width="75%"
            margin={"auto"}
            padding={3}
          >
            <form onSubmit={handleSubmit}>
              <FormControl style={{ display: "block", marginBottom: 20 }}>
                <Paper component={Box} p={2}>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 15,
                      fontWeight: "bolder",
                    }}
                  >
                    Tranjection-Type
                  </FormLabel>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="t_type"
                    value={form.t_type}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label="credit"
                    />
                    <FormControlLabel
                      value="debit"
                      control={<Radio />}
                      label="debit"
                    />
                  </RadioGroup>
                </Paper>
              </FormControl>

              <FormControl className="form-input-wrapper">
                <Paper component={Box} p={2}>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 15,
                      fontWeight: "bolder",
                      display: "block",
                    }}
                  >
                    Amount
                  </FormLabel>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </Paper>
              </FormControl>
              <FormControl style={{ display: "block", marginBottom: 20 }}>
                <Paper component={Box} p={2}>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 15,
                      fontWeight: "bolder",
                      display: "block",
                    }}
                  >
                    Remark
                  </FormLabel>
                  <TextareaAutosize
                    name="remark"
                    value={form.remark}
                    onChange={handleChange}
                    aria-label="maximum rows"
                    minRows={6}
                    placeholder="Enter remark here.."
                    style={{ width: "100%" }}
                  />
                </Paper>
              </FormControl>
              <Paper component={Box} p={2}>
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    backgroundColor: pink[400],
                    color: "white",
                    fontWeight: "bold",
                    margin: 5,
                  }}
                  type="submit"
                >
                  Add
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  style={{ color: "white", fontWeight: "bold", margin: 5 }}
                  type="reset"
                  onClick={HandleClear}
                >
                  Reset
                </Button>
              </Paper>
            </form>
          </Box>
        </Paper>
        <Box style={{ margin: 100, maxWidth: 1200 }}>
          <TableContainer
            component={Paper}
            style={{ border: 2, borderColor: "black" }}
          >
            <Table>
              <TableHead
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <TableRow>
                  <TableCell>SNo.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Tranjection_Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {moment("25/08/2024", "DD/MM/YYYY").format("ll")}
                      </TableCell>
                      <TableCell>{item?.remark}</TableCell>
                      <TableCell>{item?.t_type} </TableCell>
                      <TableCell>{item?.amount}</TableCell>
                      <TableCell>{item?.balance}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
