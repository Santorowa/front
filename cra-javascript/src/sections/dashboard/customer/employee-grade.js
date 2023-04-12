import { Typography } from "@material-ui/core";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { SeverityPill } from "src/components/severity-pill";
// color: `${colorMap(customer.totalgrade)}`,

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

export const EmployeeGrade = (props) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { totalgrade, gradedetail } = props;

  const align = mdUp ? "horizontal" : "vertical";

  // 작업 숙련도 테이블 조회하여 data setting -> 바인딩

  return (
    <Card {...props}>
      <CardHeader title="작업 숙련도" />
      <>
        <PropertyList>
          {/* 이부분을 map으로 축소 시켜볼것*/}
          <PropertyListItem
            align={align}
            divider
            label="H/C"
            subcolor="`${colorMap(gradedetail.HC)}`"
            value={gradedetail.HC}
          ></PropertyListItem>
          <PropertyListItem
            align={align}
            divider
            label="HOOD"
            value={gradedetail.HOOD}
          />
          <PropertyListItem
            align={align}
            divider
            label="CLAMP"
            value={gradedetail.CLAMP}
          />
        </PropertyList>
      </>
      <Divider />
      <CardActions sx={{ flexWrap: "wrap" }}>
        <Button size="small" variant="outlined">
          Create Invoice
        </Button>
        <Button size="small">Resend Due Invoices</Button>
      </CardActions>
    </Card>
  );
};
