import PropTypes from "prop-types";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { format } from "date-fns";
import { SeverityPill } from "src/components/severity-pill";

const statusMap = {
  working: "error",
  waiting: "success",
  reservation: "warning",
};

export const CustomerBasicDetails = (props) => {
  const {
    address1,
    address2,
    country,
    email,
    isVerified,
    phone,
    state,
    createdAt,
    status,
    company,
    ...other
  } = props;

  const address = address1 + " " + address2;
  const cvCreatedAt = format(createdAt, "yyyy/MM/dd");
  return (
    <Card {...other}>
      <CardHeader title="기본 정보" />
      <PropertyList>
        <PropertyListItem divider label="Email" value={email} />
        <PropertyListItem divider label="Phone" value={phone} />
        <PropertyListItem divider label="State/Region" value={state} />
        <PropertyListItem divider label="주소" value={address} />
        <PropertyListItem divider label="소속 회사" value={company} />
        <PropertyListItem divider label="입사일" value={cvCreatedAt} />
        <PropertyListItem divider label="현재 상태" value={status}>
          <SeverityPill color={statusMap[status]}>{status}</SeverityPill>
        </PropertyListItem>
      </PropertyList>
      <CardActions>
        <Button color="inherit" size="small">
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
};
