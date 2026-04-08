import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { CONSTANTS } from "../configs/constants";

const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  CONSTANTS.PAYPAL_CLIENT_ID!,
  CONSTANTS.PAYPAL_CLIENT_SECRET_KEY!,
);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default paypalClient;
