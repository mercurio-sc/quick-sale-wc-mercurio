export interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  UserName: string;
  SellerName: string;
  SellerId: string;
  StoreId: string;
  VendorId: string;
  Logo: string;
  PasswordAlreadyChanged: boolean;
  IsHadWarehouse: boolean;
  IsHadTermsAndConditions: boolean;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
    | string
    | string[];
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}

export enum Roles {
  ADMIN = "SuperAdmin",
  SELLER = "SellerAdmin",
  NA_ROL = "NA",
}
