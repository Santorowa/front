import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Tabs, Typography, Tab, TextField, Link, Card, Paper, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { useAuth } from "src/hooks/use-auth";
import styled from "@emotion/styled";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [display, setDisplay] = useState("Detail");
  const formik = useFormik({
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.id, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleDisplayChange = useCallback((event, value) => {
    setDisplay(value);
  }, []);

  return (
    <>
      <Head>
        <title>Employee Detail | Devias Kit</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "10 10 10 10",
          // alignItems: "center",
          display: "flex",
          // justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Tabs onChange={handleDisplayChange} sx={{ mb: 3 }} value={display}>
              <Tab label="Detail" value="Detail" />
              <Tab label="Change Log" value="ChangeLog" />
              <Tab label="Task Log" value="TaskLog" />
            </Tabs>
            {display === "Detail" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Box>
                  <Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={8}>
                        <Item>xs=6 md=8</Item>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Item>xs=6 md=4</Item>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Item>xs=6 md=4</Item>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <Item>xs=6 md=8</Item>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
              </form>
            )}
            {/* {display === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
