import React, { useState } from "react";
import {
  Grid,
  Card,
  TextField,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUpValidationSchema } from "../../utils/validations";
import AuthApi from "../../services/APIS/Auth.Api";
import dynamicStyle from "./styles";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const classes = dynamicStyle();

  const navigate = useNavigate();

  // Signup user  ...
  const { mutate: addUser, isLoading } = useMutation(
    (body) => AuthApi.signUp(body),
    {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message);
          navigate("/auth/login");
          formik.resetForm();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => handleSubmit(values),
    enableReinitialize: true,
  });

  const handleSubmit = (values) => {
    addUser(values);
  };

  return (
    <Grid className={classes.root}>
      <Card style={{ marginTop: "20px" }} sx={{ width: "50%", margin: "auto" }}>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <CardContent>
            <Grid className={classes.titelGrid}>
              <Typography className={classes.title}>SING UP</Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextField
                  name="userName"
                  label="User name"
                  type="text"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  endIcon={
                    isLoading && <CircularProgress size={26} color="inherit" />
                  }
                  variant="contained"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};

export default SignUp;
