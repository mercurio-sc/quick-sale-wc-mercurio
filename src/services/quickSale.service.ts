import axios, { AxiosRequestConfig } from "axios";

import { AUTH_TOKEN_NAME } from "../constants/app.constants";
import {
  QuickSaleNotifyRequest,
  QuickSaleRequest,
} from "../types/quickSale.type";

const config: AxiosRequestConfig = {
  headers: {
    "X-API-Key": `${import.meta.env.QUICK_SALE_TRANSACTIONS_KEY}`,
    "Content-Type": "application/json",
  },
};

export const QuickSaleValidateData = async (body: QuickSaleRequest) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    const res = await axios.post(
      `${import.meta.env.QUICK_SALE_TRANSACTIONS_URL}`,
      body,
      {
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const QuickSaleNotify = async (body: QuickSaleNotifyRequest) => {
  try {
    const res = await axios.post(
      `${import.meta.env.QUICK_SALE_TRANSACTIONS_URL}/${
        body.utid
      }/notify?method=${body.notification.notificationMethod}`,
      {},
      config
    );
    return res.data;
  } catch (error) {
    /** */
  }
};
