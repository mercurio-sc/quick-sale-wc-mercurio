import { Client, TransactionStatus, Vendor, Notification } from "./commons.dto";

export interface CreateTransactionResponse {
  utid: string;
  client: Client;
  vendor: Vendor;
  amount: number;
  description: string;
  url_endpoint: string;
  payment: null;
  notification: Notification;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
  expirationAt: Date;
}
