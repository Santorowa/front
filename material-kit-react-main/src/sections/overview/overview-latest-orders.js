import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

const statusMap = {
  working: "error",
  waiting: "success",
  reservation: "warning",
};

const onClick = () => {};

export const OverviewLatestOrders = (props) => {
  const { datas = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader
        title="작업자 현황"
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            }
          >
            Sync
          </Button>
        }
      />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>이름</TableCell>
                <TableCell sx={{ textAlign: "center" }}>투입 장소</TableCell>
                <TableCell sx={{ textAlign: "center" }}>작업</TableCell>
                <TableCell sx={{ textAlign: "center" }}>현재 상태</TableCell>
                <TableCell sx={{ textAlign: "center" }} sortDirection="desc">
                  Updated Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => {
                const createdAt = format(data.createdAt, "yyyy-MM-dd");

                return (
                  <TableRow hover key={data.id}>
                    <TableCell sx={{ textAlign: "center" }}>{data.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.location}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.task}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <SeverityPill color={statusMap[data.status]}>{data.status}</SeverityPill>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={onClick}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  datas: PropTypes.array,
  sx: PropTypes.object,
};
