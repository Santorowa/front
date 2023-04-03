import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Avatar, Button, Card, CardContent, Link, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css"; //basic
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

export const OverviewBudget = (props) => {
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
        console.log(response);
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
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Typography color="text.secondary" variant="overline">
            관련 뉴스
          </Typography>
          <Button onClick={toggleArticle}>
            <SvgIcon fontSize="small">
              {mount ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </SvgIcon>
          </Button>
        </Stack>
        {mount ? (
          <Swiper
            className="banner"
            spaceBetween={20}
            slidesPerView={1}
            // navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // pagination={{ clickable: true }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article.url}>
                <Link href={article.url} underline="hover">
                  {article.title}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Stack>
            {articles.map((article) => (
              <Typography key={article.url}>
                <Link href={article.url} underline="hover">
                  {article.title}
                </Link>
              </Typography>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
