import Stripe from "stripe";
import { CONSTANTS } from "../configs/constants";

const stripe = new Stripe(CONSTANTS.STRIPE_SECRET_KEY!);

export default stripe;
