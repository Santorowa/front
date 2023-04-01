import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon, TextField } from "@mui/material";

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
export const CustomersSearch = () => (
  <Card sx={{ p: 2 }}>
    <TextField
      fullWidth
      // variant="outlined"
      label="position"
      name="state"
      // onChange={handleChange}
      select
      SelectProps={{ native: true }}
      // value={values.state}
      sx={{ width: "25%", pr: 1, pb: 1 }}
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
      sx={{ width: "25%", pr: 1 }}
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
      sx={{ width: "25%", pr: 1 }}
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
      label="sort"
      name="state"
      // onChange={handleChange}
      select
      SelectProps={{ native: true }}
      // value={values.state}
      sx={{ width: "25%" }}
    >
      {sort.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>

    <TextField
      sx={{ width: "10%", pr: 1 }}
      fullWidth
      // variant="outlined"
      label="Search-Type"
      name="state"
      // onChange={handleChange}
      required
      select
      SelectProps={{ native: true }}
      // value={values.state}
    >
      {searchType.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search employee"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: "40%" }}
    />
    <Button
      startIcon={
        <SvgIcon fontSize="small">
          <MagnifyingGlassIcon />
        </SvgIcon>
      }
      variant="contained"
    ></Button>
  </Card>
);
