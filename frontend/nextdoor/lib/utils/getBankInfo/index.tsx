export const bankList = [
    {
      bankCode: '002',
      bankName: '산업은행',
      image: '/images/banks/kdb.png',
    },
    {
      bankCode: '003',
      bankName: '기업은행',
      image: '/images/banks/ibk.png',
    },
    {
      bankCode: '004',
      bankName: '국민은행',
      image: '/images/banks/kb.png',
    },
    {
      bankCode: '011',
      bankName: '농협은행',
      image: '/images/banks/nh.png',
    },
    {
      bankCode: '020',
      bankName: '우리은행',
      image: '/images/banks/woori.png',
    },
    {
      bankCode: '023',
      bankName: 'SC제일은행',
      image: '/images/banks/sc.png',
    },
    {
      bankCode: '027',
      bankName: '시티은행',
      image: '/images/banks/citi.png',
    },
    {
      bankCode: '032',
      bankName: '대구은행',
      image: '/images/banks/daegu.png',
    },
    {
      bankCode: '034',
      bankName: '광주은행',
      image: '/images/banks/gwangju.png',
    },
    {
      bankCode: '035',
      bankName: '제주은행',
      image: '/images/banks/jeju.png',
    },
    {
      bankCode: '037',
      bankName: '전북은행',
      image: '/images/banks/jeonbuk.png',
    },
    {
      bankCode: '039',
      bankName: '경남은행',
      image: '/images/banks/kyongnam.png',
    },
    {
      bankCode: '045',
      bankName: '새마을금고',
      image: '/images/banks/saemaul.png',
    },
    {
      bankCode: '081',
      bankName: '하나은행',
      image: '/images/banks/hana.png',
    },
    {
      bankCode: '088',
      bankName: '신한은행',
      image: '/images/banks/shinhan.png',
    },
    {
      bankCode: '090',
      bankName: '카카오뱅크',
      image: '/images/banks/kakaobank.png',
    },
    {
      bankCode: '999',
      bankName: '싸피은행',
      image: '/images/banks/ssafy.png',
    },
  ];
  

export function getBankInfo(bankCode: string){
    return bankList.find(bank => bank.bankCode === bankCode);
} 