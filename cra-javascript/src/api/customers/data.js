import { subDays, subHours, subMinutes, subSeconds } from "date-fns";

const now = new Date();

// 고객 여러명에 대한 객체
export const customers = [
  {
    id: "EP0001",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    city: "서울",
    country: "KOREA",
    currency: "$",
    email: "ycn0127@naver.com",
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: "Carson Darrin",
    state: "마포구",
    street: "잔다리로 102",
    etcAddress: " ",
    totalSpent: 300.0,
    totalOrders: 3,
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    totalGrade: "97",
    gradeDetail: {
      HOOD: "20",
      CLAMP: "94",
      HC: "95",
    },
    phone: "010-5283-6780",
    company: "Co. Santo",
    status: "working",
  },
  {
    id: "EP0002",
    avatar: "/assets/avatars/avatar-fran-perez.png",
    city: "Atlanta",
    country: "USA",
    currency: "$",
    email: "fran.perez@devias.io",
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: "Fran Perez",
    state: "Georgia",
    totalSpent: 0.0,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    totalGrade: "100",
    gradeDetail: {
      HOOD: "100",
      CLAMP: "100",
      HC: "100",
    },
    phone: "010-9356-9469",
    company: "Co. Santo",
    status: "waiting",
  },
  {
    id: "EP0003",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    city: "North Canton",
    country: "USA",
    currency: "$",
    email: "jie.yan.song@devias.io",
    hasAcceptedMarketing: false,
    isProspect: false,
    isReturning: false,
    name: "Jie Yan Song",
    state: "Ohio",
    totalSpent: 5600.0,
    totalOrders: 6,
    updatedAt: subDays(subHours(now, 4), 2).getTime(),
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    totalGrade: "95",
    gradeDetail: {
      HOOD: "96",
      CLAMP: "94",
      HC: "95",
    },
    phone: "010-1234-1234",
    company: "Co. Santo",
    status: "reservation",
  },
];

// 직원 1명에 대한 객체
export const employee = {
  id: "EP0001",
  city: "서울",
  state: "마포구",
  street: "잔다리로 102",
  address1: "서울시 마포구",
  address2: "잔다리로 102",
  etcAdress: "205호",
  avatar: "/assets/avatars/avatar-miron-vitold.png",
  balance: 0,
  country: "USA",
  currency: "$",
  email: "ycn0127@naver.com",
  hasDiscount: false,
  isVerified: true,
  name: "Santorowa",
  phone: "010-5283-6780",
  vatRate: 19,
  zipCode: "04002",
  company: "Co. Santo",
  status: "reservation",
  createdAt: subDays(subHours(now, 1), 2).getTime(),
  totalGrade: "100", // 백엔드에서 평균 산출
  gradeDetail: {
    HOOD: "100",
    CLAMP: "80",
    HC: "40",
  },
};

export const customer = {
  id: "EP0001",
  city: "서울",
  state: "마포구",
  street: "잔다리로 102",
  address1: "서울시 마포구",
  address2: "잔다리로 102",
  avatar: "/assets/avatars/avatar-miron-vitold.png",
  balance: 0,
  country: "USA",
  currency: "$",
  email: "ycn0127@naver.com",
  hasDiscount: false,
  isVerified: true,
  name: "Santorowa",
  phone: "010-5283-6780",
  vatRate: 19,
  zipCode: "04002",
  company: "Co. Santo",
  status: "working",
  createdAt: subDays(subHours(now, 1), 2).getTime(),
  totalGrade: "100", // 백엔드에서 평균 산출
  gradeDetail: {
    HOOD: "100",
    CLAMP: "80",
    HC: "40",
  },
};

export const messages = [
  {
    id: "5ece2ce3613486d95ffaea58",
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
    type: "KAKAO",
    description: "작업 안내 메일",
  },
  {
    id: "5ece2ce8cebf7ad1d100c0cd",
    createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    type: "SMS",
    description: "작업 안내 메일",
  },
];

export const emails = [
  {
    id: "5ece2ce3613486d95ffaea58",
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
    description: "작업 안내 메일",
  },
  {
    id: "5ece2ce8cebf7ad1d100c0cd",
    createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    description: "작업 안내 메일",
  },
];

export const invoices = [
  {
    id: "528651571NT",
    issueDate: now.getTime(),
    status: "paid",
    amount: 1358.75,
  },
  {
    id: "311658671JR",
    issueDate: now.getTime(),
    status: "unpaid",
    amount: 1451.75,
  },
];

export const taskLogs = [
  {
    id: "528651571NT",
    task: "HOOD",
    startDate: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    endDate: now.getTime(),
    taskLocation: "평택 1공장",
    coopList: ["산토로와", "레녹스"],
    coopNum: 8,
    issueDate: now.getTime(),
    status: "paid",
    amount: 1358.75,
  },
  {
    id: "311658671JR",
    task: "CLAMP",
    startDate: subDays(subHours(subMinutes(now, 49), 11), 7).getTime(),
    endDate: now.getTime(),
    coopNum: 7,
    coopList: ["산토로와", "레녹스"],
    taskLocation: "평택 2공장",
    issueDate: now.getTime(),
    status: "unpaid",
    amount: 1451.75,
  },
];

export const logs = [
  {
    id: "5ece2cfeb6e2ac847bba11ce",
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: "Purchase",
    ip: "84.234.243.42",
    method: "POST",
    route: "/api/purchase",
    changeInfo: "서울시 마포구 -> 서울시 서대문구",
    modify: "Admin",
    status: 200,
  },
  {
    id: "5ece2d02510484b2952e1e05",
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: "Purchase",
    ip: "84.234.243.42",
    method: "POST",
    route: "/api/purchase",
    changeInfo: "서울시 마포구 -> 서울시 서대문구",
    modify: "Admin",
    status: 522,
  },
  {
    id: "5ece2d08e2748e4e9788901a",
    createdAt: subDays(subMinutes(subSeconds(now, 23), 8), 2).getTime(),
    description: "Cart remove",
    ip: "84.234.243.42",
    method: "DELETE",
    route: "/api/products/d65654e/remove",
    changeInfo: "서울시 마포구 -> 서울시 서대문구",
    modify: "Admin",
    status: 200,
  },
];
