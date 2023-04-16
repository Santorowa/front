import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { employeesApi } from "src/api/customers";
import { useMounted } from "src/hooks/use-mounted";

const sendOptions = [
  "작업 투입 안내",
  "Send password reset",
  "Send verification",
];

const useMessages = () => {
  const isMounted = useMounted();
  const [messages, setMessages] = useState([]);

  const handleMessagesGet = useCallback(async () => {
    try {
      const response = await employeesApi.getMessages();

      if (isMounted()) {
        setMessages(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleMessagesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return messages;
};

export const EmployeeSmsKakaoSummary = (props) => {
  const [sendOption, setSendOption] = useState(sendOptions[0]);
  const messages = useMessages();

  return (
    <Card {...props}>
      <CardHeader title="SMS / 카카오톡 발송" />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          name="option"
          onChange={(event) => setSendOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{
            width: 320,
            maxWidth: "100%",
          }}
          variant="outlined"
          value={sendOption}
        >
          {sendOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <Box sx={{ mt: 2 }}>
          <Button
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Send message
          </Button>
        </Box>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>발송 내용</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => {
            const createdAt = format(message.createdAt, "yyyy/MM/dd | HH:mm");

            return (
              <TableRow
                key={message.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="subtitle2">
                    {message.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{message.type}</Typography>
                </TableCell>
                <TableCell>{createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
