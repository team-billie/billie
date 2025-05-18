import axios from "axios";
import axiosInstance from "../instance";
import {
  CreateFinUserRequestDto,
  CreateFinAccountRequestDto,
  GetAccountListRequestDto,
  AddAccountRequestDto,
  TransferAccountRequestDto,
  HoldDepositRequestDto,
  ReturnDepositRequestDto,
  GetFinUserRequestDto,
  SelectOwnerAccountRequestDto,
  PayItemRequestDto,
  VerifyAccountRequestDto,
} from "@/types/pays/request/index";

// 공통 에러 처리 함수
const handleApiError = (error: any, name: string) => {
  console.error(`${name} API 요청 중 오류가 발생했습니다.`, error);
  throw new Error(
    error.response?.data?.message || `${name} API 요청 중 오류가 발생했습니다.`
  );
};

// API 호출 래퍼 함수
const apiCall = async (endpoint: string, data: any, name: string) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, name);
  }
};

//사용자 계정 생성
export const CreateFinUserRequest = (requestBody: CreateFinUserRequestDto) =>
  apiCall("/api/v1/fintechs/users", requestBody, "사용자 계정 생성");

//사용자 계정 조회
export const GetFinUserRequest = (requestBody: GetFinUserRequestDto) =>
  axios
    .post(`https://finopenapi.ssafy.io/ssafy/api/v1/member/search`, requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "사용자 계정 조회");
    });

//계좌 생성
export const CreateFinAccountRequest = (
  requestBody: CreateFinAccountRequestDto
) => apiCall("/api/v1/fintechs/accounts", requestBody, "계좌 생성");

//계좌 목록 조회
export const GetAccountListRequest = (requestBody: GetAccountListRequestDto) =>
  apiCall("/api/v1/fintechs/accounts/list", requestBody, "계좌 목록 조회");

//계좌 등록
export const AddAccountRequest = (requestBody: AddAccountRequestDto) =>
  apiCall("/api/v1/fintechs/regist-accounts", requestBody, "계좌 등록");

//등록된 계좌 목록 조회

export const GetAddedListRequest = (userKey: string) =>
  axiosInstance
    .get(`/api/v1/fintechs/regist-accounts?userKey=${userKey}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "등록된 계좌 목록 조회");
    });

// 계좌 확인
export const VerifyAccountRequest = (requestBody: VerifyAccountRequestDto) =>
  apiCall("/api/v1/fintechs/accounts/verify", requestBody, "계좌 확인");

//계좌 이체
export const TransferAccountRequest = (
  requestBody: TransferAccountRequestDto
) => apiCall("/api/v1/fintechs/accounts/transfer", requestBody, "계좌 이체");

//물품 결제하기
export const PayItemRequest = (requestBody: PayItemRequestDto) =>
  apiCall("/api/v1/fintechs/payments", requestBody, "물품 결제하기");

//보증금 보관
export const HoldDepositRequest = (requestBody: HoldDepositRequestDto) =>
  apiCall("/api/v1/fintechs/deposits/hold", requestBody, "보증금 보관");

//보증금 반환
export const ReturnDepositRequest = (requestBody: ReturnDepositRequestDto) =>
  apiCall("/api/v1/fintechs/deposits/return", requestBody, "보증금 반환");

// -----------------------------------------
// 대여 결제 데이터 호출
export const GetPaymentDataRequest = (rentalId: string) =>
  axiosInstance
    .get(`/api/v1/rentals/${rentalId}/request-remittance`)
    .then((response) => {
      console.log("😇", response);
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "등록된 계좌 목록 조회");
    });

// Owner 계좌 선택후 결제 요청
export const SelectOwnerAccountRequest = (
  requestBody: SelectOwnerAccountRequestDto,
  rentalId: string
) => {
  axiosInstance
    .patch(`/api/v1/rentals/${rentalId}/account`, requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error, "Owner 계좌 선택");
    });
};
