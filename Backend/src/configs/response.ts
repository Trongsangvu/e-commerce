import { Response } from "express";
import { logError } from "./logger";
import { messageGeneral } from "./messages";

// Standard envelope for all API responses
interface JsonResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export class ApiResponse {
  // Core method to dispatch the response
  private static sendResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    payload: any = null,
  ): Response {
    const responseBody: JsonResponse = {
      success,
    };

    // If payload is a string, treat it as a message. Otherwise, treat it as data.
    if (typeof payload === "string") {
      responseBody.message = payload;
    } else if (payload !== null) {
      responseBody.data = payload;
    }

    return res.status(statusCode).json(responseBody);
  }

  // --- Success Responses ---

  static OK(res: Response, data: any = null) {
    return this.sendResponse(res, 200, true, data);
  }

  static Created(res: Response, data: any = null) {
    return this.sendResponse(res, 201, true, data);
  }

  static Accepted(res: Response, data: any = null) {
    return this.sendResponse(res, 202, true, data);
  }

  // --- Client Errors ---

  static BadRequest(
    res: Response,
    message: string = messageGeneral.BAD_REQUEST,
  ) {
    return this.sendResponse(res, 400, false, message);
  }

  static Unauthorized(
    res: Response,
    message: string = messageGeneral.UNAUTHORIZED,
  ) {
    return this.sendResponse(res, 401, false, message);
  }

  static Forbidden(
    res: Response,
    message: string = messageGeneral.ACCESS_DENIED,
  ) {
    return this.sendResponse(res, 403, false, message);
  }

  static NotFound(res: Response, message: string = messageGeneral.NOT_FOUND) {
    return this.sendResponse(res, 404, false, message);
  }

  static TooManyRequests(
    res: Response,
    message: string = messageGeneral.TOO_MANY_REQUESTS,
  ) {
    return this.sendResponse(res, 429, false, message);
  }

  // --- Server Errors ---

  static InternalServerError(
    res: Response,
    err?: any,
    message: string = messageGeneral.SOMETHING_WRONG,
  ) {
    if (err) {
      logError(err);
    }
    return this.sendResponse(res, 500, false, message);
  }

  static ServiceUnavailable(
    res: Response,
    message: string = messageGeneral.SERVICE_UNAVAILABLE,
  ) {
    return this.sendResponse(res, 503, false, message);
  }
}
