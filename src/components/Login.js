import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

//AppBar component from the material-ui library and other functionalities makeStyle, TextFeild, SnackBar CloseIcon,   button typography 


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

//styled-components to remain the efficiency one file and easily be exported and reused

function Login() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  //useNavigate react-router-dom library that allows you to navigate to different routes
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .max(16, "Must be 16 characters or less")
        // .matches(/^[A-Za-z0-9]+$/, "Must be alphanumeric")
        .required("Required"),
    }),


    //yup for value parsing and validation with formik
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/login", values);
        if (res.status === 200) {
          navigate("/search");
        } else {
          setMessage("Invalid email or password");
          setOpen(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //used formik for form validation it speeds up process  

  return (
    <LoginContainer>
      <Form onSubmit={formik.handleSubmit} className={classes.root}>
        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={formik.touched.email ? formik.errors.email : ""}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.touched.password ? formik.errors.password : ""}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Button type="submit" onClick={() => navigate("/search")}>
          Login
        </Button>
      </Form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </LoginContainer>
  );
}

export default Login;
