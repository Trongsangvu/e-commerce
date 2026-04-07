import { Request, Response } from "express";
import {
  messageDeleted,
  messageInvalid,
  messageNotFound,
  messageProduct,
} from "../config/messages";
import { ApiResponse } from "../config/response";
import productService from "../services/product.service";

export const getProducts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await productService.find();
    ApiResponse.OK(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.findById(String(id));

    ApiResponse.OK(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await productService.create(req.body);
    ApiResponse.Created(res, { products: product });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const searchProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

    res.json(products);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};
