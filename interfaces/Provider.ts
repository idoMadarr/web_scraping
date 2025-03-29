import { Page } from "puppeteer";
import { Selector } from "./Selelctor";

export interface Provider {
    name: string;
    url: string;
    selector: Selector;
  }