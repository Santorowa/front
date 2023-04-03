import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";

const companies = [
  {
    id: "1",
    createdAt: "27/04/2019",
    description: "규격별 HOOD 설치 작업 가이드",
    logo: "/assets/logos/logo-dropbox.png",
    title: "HOOD 설치",
    lastCompDate: "2023-04-01 16:00:55",
    downloads: "594",
  },
  {
    id: "2",
    createdAt: "31/03/2019",
    description: "규격별 HOOD 조립 작업 가이드",
    logo: "/assets/logos/logo-medium.png",
    title: "HOOD 조립",
    lastCompDate: "2023-04-01 16:00:55",
    downloads: "625",
  },
  {
    id: "3",
    createdAt: "03/04/2019",
    description: "",
    logo: "/assets/logos/logo-slack.png",
    title: "Slack",
    lastCompDate: "2022-03-01 16:00:55",
    downloads: "857",
  },
  {
    id: "4",
    createdAt: "04/04/2019",
    description: "Lyft is an on-demand transportation company based in San Francisco, California.",
    logo: "/assets/logos/logo-lyft.png",
    title: "Z축 Which 설치",
    lastCompDate: "2023-03-31 16:00:55",
    downloads: "406",
  },
  {
    id: "5",
    createdAt: "04/04/2019",
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    logo: "/assets/logos/logo-github.png",
    title: "Safety Bar 설치",
    lastCompDate: "2023-04-01 16:00:55",
    downloads: "835",
  },
  {
    id: "6",
    createdAt: "04/04/2019",
    description: "작업 환경 속 선정리 및 유독가스 배관 작업 관련 가이드",
    logo: "/assets/logos/logo-squarespace.png",
    title: "8계통 작업",
    lastCompDate: "2023-04-01 16:00:55",
    downloads: "835",
  },
];

const Page = () => (
  <>
    <Head>
      <title>Companies | Devias Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">작업 가이드</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                {/* <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button> */}
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <CompaniesSearch />
          <Grid container spacing={3}>
            {companies.map((company) => (
              <Grid xs={12} md={6} lg={4} key={company.id}>
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination count={3} size="small" />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
