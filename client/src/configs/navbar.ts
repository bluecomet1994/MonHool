import { NavbarItem } from "@/types/configs";

export const navbarConfig: NavbarItem[] = [
  {
    id: 1,
    title: "Wallet",
    isNew: false,
    path: "/wallet"
  },
  {
    id: 2,
    title: "Staking",
    isNew: true,
    path: "/staking"
  },
  {
    id: 3,
    title: "Trading Bot",
    isNew: false,
    path: "/trading-bot"
  },
];