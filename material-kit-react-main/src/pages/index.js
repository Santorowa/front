import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Overview | Devias Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} lg={12}>
            <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
          </Grid>

          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "작업 완료",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
                {
                  name: "작업 진행 중",
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[63, 15, 22, 33]}
              labels={["PLAD", "HOOD", "CLAMP", "H/C"]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewLatestProducts
              products={[
                {
                  id: "1",
                  image: "/assets/products/product-1.png",
                  name: "HOOD",
                  updatedAt: subHours(now, 6).getTime(),
                  progress: "100",
                },
                {
                  id: "2",
                  image: "/assets/products/product-2.png",
                  name: "CLAMP",
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  progress: "80",
                },
                {
                  id: "3",
                  image: "/assets/products/product-5.png",
                  name: "H/C",
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  progress: "60",
                },
                {
                  id: "4",
                  image: "/assets/products/product-6.png",
                  name: "PLAD",
                  updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  progress: "100",
                },
                {
                  id: "5",
                  image: "/assets/products/product-7.png",
                  name: "Healthcare Ritual",
                  updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  progress: "10",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewLatestOrders
              datas={[
                {
                  id: "1",
                  name: "Santorowa",
                  location: "평택 1공장",
                  task: "HOOD 설치",
                  createdAt: 1555016400000,
                  status: "working",
                },
                {
                  id: "2",
                  name: "Lenox",
                  location: "평택 2공장",
                  task: "-",
                  createdAt: 1555016400000,
                  status: "waiting",
                },
                {
                  id: "3",
                  name: "수보암",
                  location: "평택 3공장",
                  task: "Safety Bar 설치",
                  createdAt: 1555016400000,
                  status: "reservation",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
