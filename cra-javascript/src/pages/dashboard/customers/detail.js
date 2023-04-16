import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { employeesApi } from "src/api/customers";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { EmployeeBasicDetails } from "src/sections/dashboard/customer/employee-basic-details";
import { EmployeeDataManagement } from "src/sections/dashboard/customer/employee-data-management";
import { EmployeeSmsKakaoSummary } from "src/sections/dashboard/customer/employee-sms-kakao-summary";
import { EmployeeTaskLogs } from "src/sections/dashboard/customer/employee-task-logs";
import { EmployeeGrade } from "src/sections/dashboard/customer/employee-grade";
import { EmployeeChangeLogs } from "src/sections/dashboard/customer/employee-change-logs";
import { getInitials } from "src/utils/get-initials";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Change Log", value: "changeLog" },
  { label: "Task Log", value: "taskLog" },
];

const useCustomer = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await employeesApi.getEmployee();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customer;
};

const useTaskLogs = () => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await employeesApi.getTaskLogs();

      if (isMounted()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleInvoicesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return invoices;
};

const useLogs = () => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const handleLogsGet = useCallback(async () => {
    try {
      const response = await employeesApi.getLogs();

      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleLogsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return logs;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState("details");
  const customer = useCustomer();
  const taskLogs = useTaskLogs();
  const logs = useLogs();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!customer) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Customer Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">직원 목록</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{customer.name}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">ID :</Typography>
                      <Chip label={customer.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    href={paths.dashboard.customers.edit}
                  >
                    Edit
                  </Button>
                  <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Actions
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === "details" && (
              <div>
                <Grid container spacing={4}>
                  <Grid xs={12} lg={4}>
                    <EmployeeBasicDetails
                      address1={customer.address1}
                      address2={customer.address2}
                      country={customer.country}
                      email={customer.email}
                      isVerified={!!customer.isVerified}
                      phone={customer.phone}
                      state={customer.state}
                      createdAt={customer.createdAt}
                      status={customer.status}
                      company={customer.company}
                    />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Stack spacing={4}>
                      <EmployeeGrade
                        totalgrade={customer.totalGrade}
                        gradedetail={customer.gradeDetail}
                      />
                      <EmployeeSmsKakaoSummary />
                      <EmployeeDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === "taskLog" && (
              <EmployeeTaskLogs taskLogs={taskLogs} />
            )}
            {currentTab === "changeLog" && <EmployeeChangeLogs logs={logs} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
