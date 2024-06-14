import { DocumentModel } from "./types";

export const AUTH_TOKEN_LOCALSTORAGE_NAME = "jwt";

export const MAX_LENGTH_DESCRIPTION = 500;

export const MIN_CREDIT_VALUE = 8000;

export const DEFAULT_DOCUMENT_TYPE = "CC";

export const DOCUMENT_TYPES: DocumentModel[] = [
  {
    id: 0,
    value: "CC",
    name: "Cédula de ciudadanía",
  },
  {
    id: 1,
    value: "CE",
    name: "Cédula de extranjería",
  },
];
