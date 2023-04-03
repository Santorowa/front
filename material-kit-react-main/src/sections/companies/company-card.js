import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import { format, differenceInDays, differenceInHours } from "date-fns";

const now = new Date();

const formatLastCompDate = (lastCompDate) => {
  let convertDate = new Date(lastCompDate);
  let diffDate = differenceInDays(now, convertDate);
  let diffHour = differenceInHours(now, convertDate);
  let result = "";
  /*
  완료 시간이 24시간 이내 : ~ Hours ago
  완료 날짜가 7일 이내 : ~ Days ago
  그 외  : 날짜 YYYY-MM-dd 형식으로 출력
  */
  if (diffHour < 24) {
    result = `${diffHour} Hours ago`;
  } else if (diffDate < 7) {
    result = `${diffDate} Days ago`;
  } else {
    result = `${format(convertDate, "yyyy-MM-dd")}`;
  }

  return "최근 완료 일자 : " + result;
};

export const CompanyCard = (props) => {
  const { company } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={company.logo} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {company.title}
        </Typography>
        <Typography align="center" variant="body1">
          {company.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {formatLastCompDate(company.lastCompDate)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {company.downloads} Downloads
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
