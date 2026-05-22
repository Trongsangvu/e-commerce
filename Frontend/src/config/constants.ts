import { CalendarDays, Package, Zap } from "lucide-react";
import LANGUAGE from "../utils/language-util";

export const APP_STATE = {};

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const BENEFITS = [
  {
    icon: "✓",
    title: "Free Shipping",
    desc: "On orders above $75",
  },
  {
    icon: "↺",
    title: "Easy Returns",
    desc: "30-day hassle-free policy",
  },
  {
    icon: "◈",
    title: "Premium Quality",
    desc: "Curated fabrics & craft",
  },
  {
    icon: "◎",
    title: "24 / 7 Support",
    desc: "We're always here",
  },
];

export const REVIEWS = [
  {
    initials: "SA",
    name: "Sofia A.",
    stars: "★★★★★",
    text: `"The linen dress I ordered is absolutely stunning."`,
  },
  {
    initials: "ML",
    name: "Marcus L.",
    stars: "★★★★★",
    text: `"Finally a brand that gets it right."`,
  },
  {
    initials: "PN",
    name: "Pri N.",
    stars: "★★★★☆",
    text: `"Fast shipping and beautiful packaging."`,
  },
];

export const ANNOUNCEMENTS = [
  "Free Shipping Over $75",
  "New Arrivals Every Week",
  "Sustainable Materials",
  "30-Day Returns",
];

export const BANNER_ITEMS = [
  { imgKey: "banner1" as const, label: LANGUAGE.GENERAL.WOMEN, bg: "bg-[#1c1814]" },
  { imgKey: "banner2" as const, label: LANGUAGE.GENERAL.MEN, bg: "bg-[#2c2825]" },
  { imgKey: "banner3" as const, label: LANGUAGE.GENERAL.ACCESSORIES, bg: "bg-[#1e1c1a]" },
];

export const FOOTER_ITEMS = [
  {
    title: "Shop",
    links: ["Women", "Men", "Accessories", "New Arrivals", "Sale"],
  },
  {
    title: "Help",
    links: [
      "Size Guide",
      "Shipping Info",
      "Returns",
      "Track My Order",
      "Contact Us",
    ],
  },
  {
    title: "Company",
    links: [
      "About Coza",
      "Sustainability",
      "Careers",
      "Press",
      "Affiliates",
    ],
  },
];

export const LOGIN_ITEMS = [
  {
    icon: Package,
    title: "Track Your Orders",
    desc: "Follow your orders every step of the way.",
  },
  {
    icon: Zap,
    title: "Streamline Checkout",
    desc: "Check out faster with saved addresses and payment methods.",
  },
  {
    icon: CalendarDays,
    title: "Book an Appointment",
    desc: "Enjoy priority access to the boutique of your choice at the time and date that suits you.",
  },
];