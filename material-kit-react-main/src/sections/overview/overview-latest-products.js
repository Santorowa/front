import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 6 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const LinearWithValueLabel = (props) => {
  const [progress, setProgress] = useState(10);

  let barColor = "";

  let convertProgress = parseInt(props.value);

  useEffect(() => {
    setProgress(convertProgress);
  }, [convertProgress]); // TODOLIST

  if (convertProgress == 100) {
    barColor = "info";
  } else if (convertProgress >= 80 && convertProgress < 100) {
    barColor = "error";
  } else if (convertProgress >= 60 && convertProgress < 80) {
    barColor = "secondary";
  } else if (convertProgress >= 40 && convertProgress < 60) {
    barColor = "success";
  } else if (convertProgress >= 20 && convertProgress < 40) {
    barColor = "warning";
  } else {
    barColor = "inherit";
  }

  return (
    <Box sx={{ width: "30%" }}>
      <LinearProgressWithLabel value={progress} color={barColor} />
    </Box>
  );
};

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader
        title="작업 진행 현황"
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
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemAvatar>
                {product.image ? (
                  <Box
                    component="img"
                    src={product.image}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <LinearWithValueLabel value={product.progress} />
            </ListItem>
          );
        })}
      </List>

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
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
