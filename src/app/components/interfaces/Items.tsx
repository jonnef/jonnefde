import { PropsWithChildren } from "react";

export interface Items extends PropsWithChildren {
  itemText: string;
  itemId: number;
}