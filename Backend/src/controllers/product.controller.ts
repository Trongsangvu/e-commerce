import { Request, Response } from "express";
import {
  messageDeleted,
  messageInvalid,
  messageNotFound,
  messageProduct,
} from "../configs/messages";
import { ApiResponse } from "../configs/response";
import productService from "../services/product.service";
import { buildSearchFilter } from "../utils/query.util";

const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.find();
    ApiResponse.OK(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.findById(String(id));

    ApiResponse.OK(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.create(req.body);
    ApiResponse.Created(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const searchFilter = buildSearchFilter(search);

    const filter = {
      ...searchFilter,
    };

    const { products, count } = await productService.list(filter, skip, limit);
    ApiResponse.OK(res, { products, count });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // if category is null, use $unset to remove it
    if (updateData.category === null) {
      updateData.$unset = { category: "" };
      delete updateData.category;
    }

    const updatedProduct = await productService.update(String(id), updateData);

    if (!updatedProduct) {
      ApiResponse.NotFound(res, messageNotFound("Product"));
      return;
    }

    ApiResponse.OK(res, { products: updatedProduct });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await productService.remove(String(id));
    if (!product) {
      ApiResponse.NotFound(res, messageNotFound("Product"));
      return;
    }

    ApiResponse.OK(res, {
      message: messageDeleted("Product"),
      products: product,
    });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const searchProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword = req.query.name;

    if (!keyword) {
      ApiResponse.BadRequest(res, messageProduct.MISSING_SEARCH_KEYWORD);
      return;
    }

    let searchKeyWord: string;

    // If keyword is an array, join it into a string
    if (Array.isArray(keyword)) {
      searchKeyWord = keyword.join(" ");
    } else {
      // convert keyword to string
      searchKeyWord = String(keyword);
    }

    if (!searchKeyWord.trim()) {
      ApiResponse.BadRequest(res, messageInvalid("Search keyword"));
      return;
    }

    const products = await productService.search(searchKeyWord);

    ApiResponse.OK(res, { products });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export default {
  getProducts,
  getById,
  create,
  update,
  deleteProduct,
  searchProduct,
  list,
};
