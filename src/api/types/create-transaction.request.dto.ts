import { Client } from "./commons.dto";

export interface CreateTransactionRequest {
  client: Client;
  amount: number;
  description?: string;
}
