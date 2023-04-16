import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useUpdateEffect } from "src/hooks/use-update-effect";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Accepts Marketing",
    value: "hasAcceptedMarketing",
  },
  {
    label: "Prospect",
    value: "isProspect",
  },
  {
    label: "Returning",
    value: "isReturning",
  },
];

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Total orders (highest)",
    value: "totalOrders|desc",
  },
  {
    label: "Total orders (lowest)",
    value: "totalOrders|asc",
  },
];

const searchType = [
  {
    value: "이름",
    label: "이름",
  },
  {
    value: "회원번호",
    label: "회원번호",
  },
  {
    value: "전화번호",
    label: "전화번호",
  },
];

const position = [
  {
    value: "전체",
    label: "",
  },
  {
    value: "사장",
    label: "사장",
  },
  {
    value: "부장",
    label: "부장",
  },
  {
    value: "차장",
    label: "차장",
  },
];

const task = [
  {
    value: "전체",
    label: "",
  },
  {
    value: "1차",
    label: "1차",
  },
  {
    value: "CLAMP",
    label: "CLAMP",
  },
  {
    value: "HOOD",
    label: "HOOD",
  },
];

const grade = [
  {
    value: "전체",
    label: "",
  },
  {
    value: "100",
    label: "100",
  },
  {
    value: "99+",
    label: "99+",
  },
  {
    value: "95+",
    label: "95+",
  },
  {
    value: "80+",
    label: "80+",
  },
  {
    value: "50+",
    label: "50+",
  },
  {
    value: "20+",
    label: "20+",
  },
  {
    value: "20-",
    label: "20-",
  },
];

const sort = [
  {
    value: "이름 순",
    label: "이름 순",
  },
  {
    value: "최근 업데이트 순",
    label: "최근 업데이트 순",
  },
  {
    value: "숙련도 순",
    label: "숙련도 순",
  },
];

const state = [
  {
    value: "전체",
    label: "",
  },
  {
    value: "투입 중",
    label: "투입 중",
  },
  {
    value: "투입 예정",
    label: "투입 예정",
  },
  {
    value: "대기 중",
    label: "대기 중",
  },
];

export const EmployeeListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [filters, setFilters] = useState({});

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        hasAcceptedMarketing: undefined,
        isProspect: undefined,
        isReturning: undefined,
      };

      if (value !== "all") {
        updatedFilters[value] = true;
      }

      return updatedFilters;
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  }, []);

  const handleSortChange = useCallback(
    (event) => {
      const [sortBy, sortDir] = event.target.value.split("|");

      onSortChange?.({
        sortBy,
        sortDir,
      });
    },
    [onSortChange]
  );

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />

      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <TextField
          // fullWidth
          label="position"
          name="state"
          select
          SelectProps={{ native: true }}
          sx={{ width: "24%", flexGrow: 1 }}
        >
          {position.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          fullWidth
          // variant="outlined"
          label="task"
          name="state"
          // onChange={handleChange}
          select
          SelectProps={{ native: true }}
          // value={values.state}
          sx={{ width: "24%" }}
        >
          {task.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          fullWidth
          // variant="outlined"
          label="grade"
          name="state"
          // onChange={handleChange}
          select
          SelectProps={{ native: true }}
          // value={values.state}
          sx={{ width: "24%" }}
        >
          {grade.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          fullWidth
          // variant="outlined"
          label="state"
          name="state"
          // onChange={handleChange}
          select
          SelectProps={{ native: true }}
          // value={values.state}
          sx={{ width: "24%" }}
        >
          {state.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 1 }}
      >
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search customers"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

EmployeeListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
};
