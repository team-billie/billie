import axiosInstance from "../instance";
import { CreateFinUserRequestDto, CreateFinAccountRequestDto, GetAccountListRequestDto, AddAccountRequestDto, GetAddedListRequestDto, DepositAccountRequestDto, WithdrawAccountRequestDto, TransferAccountRequestDto, WithdrawDepositRequestDto, ReturnDepositRequestDto } from "@/types/pays/request/index";

// 공통 에러 처리 함수
const handleApiError = (error: any, name: string) => {
  console.error(`${name} API 요청 중 오류가 발생했습니다.`, error);
  throw new Error(error.response?.data?.message || `${name} API 요청 중 오류가 발생했습니다.`);
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
  apiCall("/fintechs/users", requestBody, "사용자 계정 생성");

//계좌 생성
export const CreateFinAccountRequest = (requestBody: CreateFinAccountRequestDto) => 
  apiCall("/fintechs/accounts", requestBody, "계좌 생성");

//계좌 목록 조회
export const GetAccountListRequest = (requestBody: GetAccountListRequestDto) => 
  apiCall("/fintechs/accounts/list", requestBody, "계좌 목록 조회");

//계좌 등록
export const AddAccountRequest = (requestBody: AddAccountRequestDto) => 
  apiCall("/fintechs/accounts/add", requestBody, "계좌 등록");

//등록된 계좌 목록 조회
export const GetAddedListRequest = (requestBody: GetAddedListRequestDto) => 
  apiCall("/fintechs/accounts/list", requestBody, "등록된 계좌 목록 조회");

//계좌 입금
export const DepositAccountRequest = (requestBody: DepositAccountRequestDto) => 
  apiCall("/fintechs/accounts/deposit", requestBody, "계좌 입금");

//계좌 출금
export const WithdrawAccountRequest = (requestBody: WithdrawAccountRequestDto) => 
  apiCall("/fintechs/accounts/withdraw", requestBody, "계좌 출금");

//계좌 이체
export const TransferAccountRequest = (requestBody: TransferAccountRequestDto) => 
  apiCall("/fintechs/accounts/transfer", requestBody, "계좌 이체");

//보증금 출금
export const WithdrawDepositRequest = (requestBody: WithdrawDepositRequestDto) => 
  apiCall("/fintechs/deposits/withdraw", requestBody, "보증금 출금");

//보증금 반환
export const ReturnDepositRequest = (requestBody: ReturnDepositRequestDto) => 
  apiCall("/fintechs/deposits/return", requestBody, "보증금 반환");
