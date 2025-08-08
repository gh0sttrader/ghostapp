// mock/avgAnnualReturn_voo.ts

export const MOCK_VOO_AAR = [
  { period: "1Y" as const, price: 16.32, nav: 16.29 },
  { period: "3Y" as const, price: 17.06, nav: 17.06 },
  { period: "5Y" as const, price: 15.83, nav: 15.84 },
  { period: "10Y" as const, price: 13.62, nav: 13.62 },
  { period: "Since" as const, price: 14.55, nav: 14.64, sinceDate: "Sep 7, 2010" },
];
