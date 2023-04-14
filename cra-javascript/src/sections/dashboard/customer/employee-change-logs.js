import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { MoreMenu } from "src/components/more-menu";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";

export const EmployeeChangeLogs = (props) => {
  const { logs = [], ...other } = props;

  return (
    <Card {...other}>
      <CardHeader action={<MoreMenu />} title="Change Logs" />
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>변경 내역</TableCell>
              <TableCell>변경자</TableCell>
              <TableCell>변경일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => {
              const statusColor =
                log.status >= 200 && log.status < 300 ? "success" : "error";
              const createdAt = format(log.createdAt, "yyyy/MM/dd HH:mm:ss");

              return (
                <TableRow key={log.id}>
                  {/* <TableCell width="100">
                    <Typography color="text.secondary" variant="caption">
                      {log.method}
                    </Typography>
                  </TableCell>
                  <TableCell width="64">
                    <SeverityPill color={statusColor}>
                      {log.status}
                    </SeverityPill>
                  </TableCell> */}
                  <TableCell>{log.changeInfo}</TableCell>
                  <TableCell>{log.modify}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={logs.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmployeeChangeLogs.propTypes = {
  logs: PropTypes.array,
};
