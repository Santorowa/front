import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import SwiperCore, { Autoplay } from "swiper";
import { useEffect, useState } from "react";

export const OverviewDoneTasks = (props) => {
  const { amount } = props;

  SwiperCore.use([Autoplay]);
  const { difference, positive = false, sx, value } = props;

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=96b878cf3d334289bf4fd4cc43b93cee"
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 대기 중일 때
  if (loading) {
    return "대기 중";
  }

  // 아직 articles 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  const toggleArticle = () => {
    setMount((mount) => !mount); // on,off 개념 boolean
  };

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img src="/assets/iconly/iconly-glass-tick.svg" width={48} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="text.secondary" variant="body2">
            Done Tasks
          </Typography>
          <Typography color="text.primary" variant="h4">
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
        >
          See all tasks
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewDoneTasks.propTypes = {
  amount: PropTypes.number.isRequired,
};
