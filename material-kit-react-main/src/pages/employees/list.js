import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    empno: "EP0001",
    name: "Santorowa",
    position: "사장",
    grade: "99",
    gradeDetail: {
      HOOD: "96",
      CLAMP: "94",
      HC: "95",
    },
    address: {
      city: "서울",
      state: "마포구",
      street: "잔다리로 102",
    },
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "ycn0127@naver.com",
    phone: "010-5283-6780",
    company: "Co. Santo",
    status: "working",
  },
  {
    id: "2",
    empno: "EP0002",
    name: "Lenox",
    position: "이사",
    grade: "100",
    gradeDetail: {
      HOOD: "96",
      CLAMP: "94",
      HC: "95",
    },
    address: {
      city: "경기도",
      state: "평택시",
      street: "잔달라로 102",
    },
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "inee1995@naver.com",
    phone: "010-9356-9469",
    company: "Co. Santo",
    status: "waiting",
  },
  {
    id: "3",
    empno: "EP0003",
    name: "수사보다암사",
    position: "사원",
    grade: "95",
    gradeDetail: {
      HOOD: "96",
      CLAMP: "94",
      HC: "95",
    },
    address: {
      city: "서울시",
      state: "강동구",
      street: "천호동 어딘가",
    },
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "trashAlchol@naver.com",
    phone: "010-1234-1234",
    company: "Co. Santo",
    status: "reservation",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Customers | Devias Kit</title>
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
                <Typography variant="h4">직원 정보</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Excel
                  </Button>
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
                  구성원 추가
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
