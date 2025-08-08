// mock/aboutData.ts
import { Security } from "@/components/AboutSection";

export const MOCK_AAPL: Security = {
  symbol: "AAPL",
  name: "Apple Inc.",
  type: "stock",
  about:
    "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  ceo: "Tim Cook",
  employees: "164,000",
  headquarters: "Cupertino, CA",
  founded: "1976",
};

export const MOCK_VOO: Security = {
  symbol: "VOO",
  name: "Vanguard S&P 500 ETF",
  type: "etf",
  about:
    "VOO seeks to track an index of large-cap U.S. equities (dummy data).",
  indexTracked: "S&P 500 (TR USD)",
  category: "Large Blend",
  holdingsCount: 500,
  inceptionDate: "Sep 7, 2010",
};
