import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const environemnt = new checkoutNodeJssdk.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environemnt);

export default paypalClient;
