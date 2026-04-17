import paypal, { OrdersController } from "@paypal/paypal-server-sdk";
import { CONSTANTS } from "../configs/constants";

const { Client, Environment } = paypal;

const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: CONSTANTS.PAYPAL_CLIENT_ID!,
    oAuthClientSecret: CONSTANTS.PAYPAL_CLIENT_SECRET_KEY!,
  },
  environment: Environment.Sandbox, // or "live"
});

export default paypalClient;
export const ordersController = new OrdersController(paypalClient);
