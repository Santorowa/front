import { ThemeProvider } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { SeverityPill } from "src/components/severity-pill";

const theme = unstable_createMuiStrictModeTheme();

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

export const CustomersTable = (props) => {
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
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
                <TableCell sx={{ textAlign: "center" }}>이름</TableCell>
                <TableCell sx={{ textAlign: "center" }}>숙련도</TableCell>
                <TableCell sx={{ textAlign: "center" }}>연락처</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Email</TableCell>
                <TableCell sx={{ textAlign: "center" }}>주소</TableCell>
                <TableCell sx={{ textAlign: "center" }}>소속 회사</TableCell>
                <TableCell sx={{ textAlign: "center" }}>입사일</TableCell>
                <TableCell sx={{ textAlign: "center" }}>현재 상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((data) => {
                const isSelected = selected.includes(data.id);
                const createdAt = format(data.createdAt, "yyyy/MM/dd");
                // prettier-ignore  &nbsp;
                const detailGrade = (
                  <>
                    H/C:{" "}
                    <span style={{ color: `${colorMap(data.gradeDetail.HC)}` }}>
                      {data.gradeDetail.HC}
                    </span>
                    <br />
                    HOOD:{" "}
                    <span style={{ color: `${colorMap(data.gradeDetail.HOOD)}` }}>
                      {data.gradeDetail.HOOD}
                    </span>
                    <br />
                    CLAMP:{" "}
                    <span style={{ color: `${colorMap(data.gradeDetail.CLAMP)}` }}>
                      {data.gradeDetail.CLAMP}
                    </span>
                    <br />
                  </>
                );

                return (
                  <TableRow hover key={data.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(data.id);
                          } else {
                            onDeselectOne?.(data.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.empno}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={data.avatar}>{getInitials(data.name)}</Avatar>
                        <Typography sx={{ textAlign: "center" }} variant="subtitle2">
                          {data.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    {/* 해당 컴포넌트는 react와 mui간의 충돌 경고 메세지 삭제용 자세한 내용은 https://hini7.tistory.com/151 참고 */}
                    <ThemeProvider theme={theme}>
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
                        <TableCell sx={{ textAlign: "center", color: `${colorMap(data.grade)}` }}>
                          {data.grade}
                        </TableCell>
                      </Tooltip>
                    </ThemeProvider>
                    <TableCell sx={{ textAlign: "center" }}>{data.phone}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {data.address.city} {data.address.state} {data.address.street}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.company}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{createdAt}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <SeverityPill color={statusMap[data.status]}>{data.status}</SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
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
    </Card>
  );
};

CustomersTable.propTypes = {
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
