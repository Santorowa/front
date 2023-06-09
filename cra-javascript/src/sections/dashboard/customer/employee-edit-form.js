import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Modal,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import * as Yup from "yup";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { useState } from "react";
import Post from "src/components/post";
import PopupPostCode from "src/components/post";
import PopupDom from "src/components/popupDom";
// import Postcode from "@actbase/react-daum-postcode";
import DaumPostcode from "react-daum-postcode";

const statusMap = {
  working: "error",
  waiting: "success",
  reservation: "warning",
};

const state = [
  {
    value: "working",
    label: "투입 중",
  },
  {
    value: "reservation",
    label: "투입 예정",
  },
  {
    value: "waiting",
    label: "대기 중",
  },
];

export const EmployeeEditForm = (props) => {
  const { employee, ...other } = props;
  const formik = useFormik({
    initialValues: {
      address1: employee.address1 || "",
      address2: employee.address2 || "",
      country: employee.country || "",
      email: employee.email || "",
      hasDiscount: employee.hasDiscount || false,
      isVerified: employee.isVerified || false,
      name: employee.name || "",
      phone: employee.phone || "",
      state: employee.state || "",
      company: employee.company || "",
      status: employee.status || "",
      submit: null,
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup.string().max(255).required("Name is required"),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
      status: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer updated");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [isModal, setModal] = useState(false);
  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Employee" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                sx={{ width: "80%" }}
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Address 1"
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              ></TextField>

              <Box
                m={1}
                display="inline-flex"
                justifyContent="center"
                alignItems="center"
              >
                <div className="address_search">
                  <Button
                    startIcon={
                      <SvgIcon>
                        <SearchIcon />
                      </SvgIcon>
                    }
                    onClick={handleComplete}
                    // size="large"
                    variant="contained"
                  ></Button>

                  {popup && (
                    <Post
                    // company={enroll_company}
                    // setcompany={setEnroll_company}
                    ></Post>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label="Address 2"
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.company && formik.errors.company)}
                fullWidth
                helperText={formik.touched.company && formik.errors.company}
                label="소속 회사"
                name="company"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.company}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.status && formik.errors.status)}
                fullWidth
                helperText={formik.touched.status && formik.errors.status}
                label="현재 상태"
                name="status"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                defaultValue={formik.values.status}
                SelectProps={{ native: true }}
              >
                {state.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/* <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Make Contact Info Public
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Means that anyone viewing your profile will be able to see
                  your contacts details
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isVerified}
                color="primary"
                edge="start"
                name="isVerified"
                onChange={formik.handleChange}
                value={formik.values.isVerified}
              />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack>
          </Stack> */}
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.details}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

EmployeeEditForm.propTypes = {
  employee: PropTypes.object.isRequired,
};
