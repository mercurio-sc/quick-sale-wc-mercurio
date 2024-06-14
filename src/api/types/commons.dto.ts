export enum TransactionStatus {
  /**
   * The transaction has been created successfully.
   */
  NEW = "new",

  /**
   * The transaction has been notified successfully through
   * the notification method selected.
   */
  NOTIFIED = "notified",

  /**
   * The transaction has been opened by the client for first time.
   */
  OPEN = "open",

  /**
   * The payment for the transaction has been initialized and is
   * in process.
   */
  PAYMENT = "payment",

  /**
   * The transaction has been closed successfully.
   * This is the final state of the transaction.
   */
  CLOSED = "closed",

  /**
   * The transaction has been expired.
   */
  EXPIRED = "expired",

  /**
   * The transaction has been canceled by the client.
   */
  CANCELED = "canceled",

  /**
   * The transaction has a failed payment process.
   */
  FAILED = "failed",
}

export enum NotificationMethods {
  EMAIL = "email",
  SMS = "sms",
  WHATSAPP = "whatsapp",
}

export interface Vendor {
  storeId: string;
  vendorId: string;
  sellerId: number;
}

export interface Notification {
  availableMethods: NotificationMethods[];
}

export interface Document {
  type: string;
  value: string;
}

export interface Client {
  document: Document;
}
