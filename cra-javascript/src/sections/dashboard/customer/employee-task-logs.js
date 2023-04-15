import PropTypes from "prop-types";
import { format } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Card,
  CardHeader,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { MoreMenu } from "src/components/more-menu";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { paths } from "src/paths";

export const EmployeeTaskLogs = (props) => {
  const { taskLogs = [], ...other } = props;

  return (
    <Card {...other}>
      <CardHeader action={<MoreMenu />} title="Task Log" />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>작업 번호</TableCell>
              <TableCell sx={{ textAlign: "center" }}>작업명</TableCell>
              <TableCell sx={{ textAlign: "center" }}>기간</TableCell>
              <TableCell sx={{ textAlign: "center" }}>작업장소</TableCell>
              <TableCell sx={{ textAlign: "center" }}>투입 인원</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {taskLogs.map((taskLog) => {
              const issueDate = format(taskLog.issueDate, "yyyy.MM.dd");
              const startDate = format(taskLog.startDate, "yyyy.MM.dd");
              const endDate = format(taskLog.endDate, "yyyy.MM.dd");
              const statusColor =
                taskLog.status === "paid" ? "success" : "error";

              return (
                <TableRow key={taskLog.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {taskLog.id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {taskLog.task}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {startDate} ~ {endDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {taskLog.taskLocation}
                  </TableCell>
                  <Tooltip
                    title={taskLog.coopList.join(", ")}
                    placement="right"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#1F1F1F",
                        },
                      },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      {taskLog.coopNum} 명
                    </TableCell>
                  </Tooltip>

                  {/* <TableCell sx={{ textAlign: "center" }}>
                    <SeverityPill color={statusColor}>
                      {taskLog.status}
                    </SeverityPill>
                  </TableCell> */}
                  {/* <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      href={paths.dashboard.invoices.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={taskLogs.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmployeeTaskLogs.propTypes = {
  invoices: PropTypes.array,
};
