import { NumberInput } from "@angular/cdk/coercion";

export interface AutocompleteOption {
    symbol: string;
    description: string;
    type: string;
}

export interface AutocompleteResponse {
    count: number;
    result: AutocompleteOption[];
}

export interface ProfileResponse {
    country: string;
    currency: string;
    exchange: string;
    name: string;
    ticker: string;
    ipo: string;
    marketCapitalization: number;
    shareOutstanding: number;
    logo: string;
    phone: string;
    weburl: string;
    finnhubIndustry: string;
}

export interface QuoteResponse {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

export interface PeersResponse {
    peers: string[];
}

export interface News {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

export interface NewsResponse {
    topNews: News[];
}

export interface StockCandleResponse {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    s: string;
    t: number[];
    v: number[];
}

export interface SocialSentimentObject {
    atTime: string;
    mention: number;
    positiveScore: number;
    negativeScore: number;
    positiveMention: number;
    negativeMention: number;
    score: number;
}

export interface SocialSentimentResponse {
    reddit: SocialSentimentObject[];
    symbol: string;
    twitter: SocialSentimentObject[];
}

export interface RecommendationTrendObject {
    buy: number;
    hold: number;
    period: string;
    sell: number;
    strongBuy: number;
    strongSell: number;
    symbol: string;
}

export interface EarningObject {
    actual: number;
    estimate: number;
    period: string;
    surprise: number;
    symbol: string;
}
