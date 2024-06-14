export interface CreateTransactionForm {
  documentType: string;
  documentNumber: string;
  saleValue: string;
  description?: string;
  roadClass: string;
  roadNumber: string;
  junctionNumber: string;
  distanceDoor: string;
  department: string;
  city: string;
  addressComplement: string;
}

export interface QuickSaleRequest {
  client: Client;
  description?: string;
  amount: number;
}

export interface Client {
  document: Document;
  shipping?: Shipping;
}

export type IValidateDate =
  | "unregisteredClient"
  | "registeredClient"
  | "creditLimitExceeded"
  | "";

export interface NotificationMethod {
  notificationMethod: string;
}
export interface QuickSaleNotifyRequest {
  utid: string;
  notification: NotificationMethod;
}

export interface QuickSaleTransactions {
  page: string;
  limit: string;
  sellerId: string;
  filter: string;
}

export interface IPagination {
  limit: number;
  page: number;
  pageTotal: number;
  total: number;
  filter?: string;
}

export interface QuickSaleData {
  data: Data[];
  limit: number;
  page: number;
  pageTotal: number;
  total: number;
}

export interface Data {
  _id: string;
  utid: string;
  client?: ClientData;
  amount: number;
  description: string;
  payment: string;
  notification: Notifications;
  status: string;
  expirationAt: string;
  createdAt: string;
  updatedAt: string;
  url_endpoint: string;
}

export interface Notifications {
  availableMethods: string[];
}

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  document: Document;
  shipping?: Shipping;
}

export interface Document {
  type: string;
  value: string;
}

export interface Shipping {
  address1: string;
  address2: string;
  province: string;
  provinceCode: number;
  city: string;
  cityCode: number;
  roadClass: string;
  roadNumber: string;
  junctionNumber: string;
  distanceDoor: string;
}

export interface Vendor {
  storeId: string;
  vendorId: string;
  sellerId: string;
}

export interface TableColumn {
  column: string | React.ReactNode;
  class: string;
}

export interface NotifyResponse {
  availableMethods: string[];
  retryAt: string;
  retryDelay: number;
  sent: Sent;
}

export interface Sent {
  email: Email;
}

export interface Email {
  sentAt: string;
  sent: boolean;
}
