import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { getInitials } from "src/utils/get-initials";
import { format } from "date-fns";
import { SeverityPill } from "src/components/severity-pill";

const colorMap = (grade) => {
  let color;

  if (grade == 100) {
    color = "#e5cc80";
  } else if (grade >= 99) {
    color = "#e268a8";
  } else if (grade >= 95) {
    color = "#ff8000";
  } else if (grade >= 75) {
    color = "#a335ee";
  } else if (grade >= 50) {
    color = "#0070ff";
  } else if (grade >= 25) {
    color = "#1eff00";
  } else {
    color = "#666";
  }

  return color;
};

const statusMap = {
  working: "error",
  waiting: "success",
  reservation: "warning",
};

export const EmployeeListTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button color="inherit" size="small">
            Delete
          </Button>
          <Button color="inherit" size="small">
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>회원번호</TableCell>
              <TableCell sx={{ textAlign: "center" }}>이름/Email</TableCell>
              <TableCell sx={{ textAlign: "center" }}>숙련도</TableCell>
              <TableCell sx={{ textAlign: "center" }}>연락처</TableCell>
              <TableCell sx={{ textAlign: "center" }}>주소</TableCell>
              <TableCell sx={{ textAlign: "center" }}>소속 회사</TableCell>
              <TableCell sx={{ textAlign: "center" }}>입사일</TableCell>
              <TableCell sx={{ textAlign: "center" }}>현재 상태</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              const isSelected = selected.includes(customer.id);
              const location = `${customer.city}, ${customer.state}, ${customer.street}, ${customer.etcAddress}`;
              const createdAt = format(customer.createdAt, "yyyy/MM/dd");
              const detailGrade = (
                <>
                  H/C:{" "}
                  <span
                    style={{ color: `${colorMap(customer.gradeDetail.HC)}` }}
                  >
                    {customer.gradeDetail.HC}
                  </span>
                  <br />
                  HOOD:{" "}
                  <span
                    style={{ color: `${colorMap(customer.gradeDetail.HOOD)}` }}
                  >
                    {customer.gradeDetail.HOOD}
                  </span>
                  <br />
                  CLAMP:{" "}
                  <span
                    style={{ color: `${colorMap(customer.gradeDetail.CLAMP)}` }}
                  >
                    {customer.gradeDetail.CLAMP}
                  </span>
                  <br />
                </>
              );
              return (
                <TableRow hover key={customer.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(customer.id);
                        } else {
                          onDeselectOne?.(customer.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          href={paths.dashboard.customers.details}
                          variant="subtitle2"
                        >
                          {customer.name}
                        </Link>
                        <Typography color="text.secondary" variant="body2">
                          {customer.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <Tooltip
                    title={detailGrade}
                    placement="right"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#1F1F1F",
                        },
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        color: `${colorMap(customer.totalGrade)}`,
                      }}
                    >
                      {customer.totalGrade}
                    </TableCell>
                  </Tooltip>

                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  {/* <TableCell>
                    <Typography variant="subtitle2">{totalSpent}</Typography>
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {createdAt}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <SeverityPill color={statusMap[customer.status]}>
                      {customer.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      href={paths.dashboard.customers.edit}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={RouterLink}
                      href={paths.dashboard.customers.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

EmployeeListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
