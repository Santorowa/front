import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { employeesApi } from "src/api/customers";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { EmployeeEditForm } from "src/sections/dashboard/customer/employee-edit-form";
import { getInitials } from "src/utils/get-initials";

const useEmployee = () => {
  const isMounted = useMounted();
  const [employee, setEmployee] = useState(null);

  const handleEmployeeGet = useCallback(async () => {
    try {
      const response = await employeesApi.getEmployee();

      if (isMounted()) {
        setEmployee(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleEmployeeGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return employee;
};

const Page = () => {
  const employee = useEmployee();

  usePageView();

  if (!employee) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Employee Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
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
                  <Typography variant="subtitle2">Employee</Typography>
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
                    src={employee.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(employee.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{employee.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={employee.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <EmployeeEditForm employee={employee} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
