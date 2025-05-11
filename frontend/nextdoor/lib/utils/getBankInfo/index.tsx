export type BankDto = {
    bankCode: string;
    bankName: string;
    image: string;
    accountTypeUniqueNo: string;
}

export const bankList: BankDto[] = [
  {
    bankCode: '002',
    bankName: '산업은행',
    image: '/images/banks/kdb.png',
    accountTypeUniqueNo: '002-1-34afdeff04bc4b'
  },
  {
    bankCode: '003',
    bankName: '기업은행',
    image: '/images/banks/ibk.png',
    accountTypeUniqueNo: '003-1-5b288049b17542'
  },
  {
    bankCode: '004',
    bankName: '국민은행',
    image: '/images/banks/kb.png',
    accountTypeUniqueNo: '004-1-d6b13a3809694d'
  },
  {
    bankCode: '011',
    bankName: '농협은행',
    image: '/images/banks/nh.png',
    accountTypeUniqueNo: '011-1-9c2555eb13ad46'
  },
  {
    bankCode: '020',
    bankName: '우리은행',
    image: '/images/banks/woori.png',
    accountTypeUniqueNo: '020-1-9c0bee54cfc34f'
  },
  {
    bankCode: '023',
    bankName: 'SC제일은행',
    image: '/images/banks/sc.png',
    accountTypeUniqueNo: '023-1-ab93e23015284d'
  },
  {
    bankCode: '027',
    bankName: '시티은행',
    image: '/images/banks/citi.png',
    accountTypeUniqueNo: '027-1-edf183eaef8c4a'
  },
  {
    bankCode: '032',
    bankName: '대구은행',
    image: '/images/banks/daegu.png',
    accountTypeUniqueNo: '032-1-dc8350e93f774d'
  },
  {
    bankCode: '034',
    bankName: '광주은행',
    image: '/images/banks/gwangju.png',
    accountTypeUniqueNo: '034-1-676cdd44dae54a'
  },
  {
    bankCode: '035',
    bankName: '제주은행',
    image: '/images/banks/jeju.png',
    accountTypeUniqueNo: '035-1-5b57e49cddca48'
  },
  {
    bankCode: '037',
    bankName: '전북은행',
    image: '/images/banks/jeonbuk.png',
    accountTypeUniqueNo: '037-1-7c31980ff52142'
  },
  {
    bankCode: '039',
    bankName: '경남은행',
    image: '/images/banks/kyongnam.png',
    accountTypeUniqueNo: '039-1-0192d6dcd6274a'
  },
  {
    bankCode: '045',
    bankName: '새마을금고',
    image: '/images/banks/saemaul.png',
    accountTypeUniqueNo: '045-1-06ec5f3586494d'
  },
  {
    bankCode: '081',
    bankName: '하나은행',
    image: '/images/banks/hana.png',
    accountTypeUniqueNo: '081-1-cc8209f548744f'
  },
  {
    bankCode: '088',
    bankName: '신한은행',
    image: '/images/banks/shinhan.png',
    accountTypeUniqueNo: '088-1-e2519103ffb94f'
  },
  {
    bankCode: '090',
    bankName: '카카오뱅크',
    image: '/images/banks/kakaobank.png',
    accountTypeUniqueNo: '090-1-28ec00d31d2e44'
  },
  {
    bankCode: '999',
    bankName: '싸피은행',
    image: '/images/banks/ssafy.png',
    accountTypeUniqueNo: '999-1-6c20074711854e'
  },
  {
    bankCode: '000',
    bankName: '알수없음',
    image: '/images/banks/unknown.png',
    accountTypeUniqueNo: '' 
  },

]

  

export function getBankInfo(bankCode: string){
    return bankList.find(bank => bank.bankCode === bankCode);
} 