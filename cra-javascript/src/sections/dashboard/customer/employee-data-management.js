import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export const EmployeeDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="직원 관리" />
    <CardContent sx={{ pt: 0 }}>
      <Button color="error" variant="outlined">
        회원 삭제
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography color="text.secondary" variant="body2">
          퇴사한 직원의 계정을 삭제할 경우 30일 이내에서만 복구가
          가능합니다(이부분 정책 결정)
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
