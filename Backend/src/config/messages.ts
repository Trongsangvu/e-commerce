export const messageGeneral = {
  SOMETHING_WRONG: "An error has occurred",
  ACCESS_DENIED: "Access denied, you do not have permission",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Not authenticated",
  NOT_FOUND: "Not found",
  TOO_MANY_REQUESTS: "Too many requests",
  SERVICE_UNAVAILABLE: "Service unavailable",
};

export const messageRequired = (field: string) => `${field} is required`;

export const messageInvalid = (field: string) => `${field} is invalid`;

export const messageNotFound = (field: string) => `Cannot find ${field}`;

export const messageDeleted = (field: string) => `Deleted ${field} successfully`;

export const messageExisted = (field: string) => `${field} already exists`;
