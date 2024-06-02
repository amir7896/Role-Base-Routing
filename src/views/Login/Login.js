import React from "react";
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
import { signInValidationSchema } from "../../utils/validations";
import { Link } from "react-router-dom";

import dynamicStyle from "./styles";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const classes = dynamicStyle();

  const navigate = useNavigate();

  const { signin } = useAuth();

  // Signup user  ...
  const { mutate: signinUser, isLoading } = useMutation(
    (body) => signin(body),
    {
      onSuccess: (res) => {
        if (res.response.success) {
          toast.success(res.response.message);
          navigate("/");
          formik.resetForm();
        } else {
          toast.error(res.response.message);
        }
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    signinUser(values);
  };

  return (
    <Grid className={classes.root}>
      <Card
        style={{ marginTop: "20px" }}
        sx={{
          width: "50%",
          marginLeft: "33%",
          "@media (max-width:600px)": {
            width: "50%",
            marginLeft: "45%",
          },
        }}
      >
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <CardContent>
            <Grid className={classes.titelGrid}>
              <Typography className={classes.title}>LOG IN</Typography>
            </Grid>

            <Grid container spacing={2}>
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
                  SignIn
                </Button>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Grid item xs>
                <Link to={"/"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/auth/register"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};

export default SignIn;
