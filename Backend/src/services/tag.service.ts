import { IProduct } from "../types/product-types";
import {
  generateAITags,
  generateSystemTags,
  mergeTags,
} from "../utils/generate-tags.util";

export class TagService {
  getSystemTags(product: IProduct) {
    return generateSystemTags(product);
  }

  async getAITags(product: IProduct) {
    return generateAITags(product);
  }

  merge(system: string[], ai: string[], admin: string[]) {
    return mergeTags(system, ai, admin);
  }
}
