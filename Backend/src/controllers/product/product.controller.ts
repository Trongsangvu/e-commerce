import { Request, Response, NextFunction } from "express";
import { Product } from "../../models/Product";
import productService from "../../services/product.service";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.find();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.findById(id);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // if category is null, use $unset toremove it
    if (updateData.category === null) {
      updateData.$unset = { category: "" };
      delete updateData.category;
    }

    const updatedProduct = await productService.update(id, updateData);

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.remove(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const keyword = req.query.name;

    if (!keyword) {
      res.status(400).json({ message: "Missing search keyword" });
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
      res.status(400).json({ message: "Invalid search keyword" });
      return;
    }

    const products = await productService.search(searchKeyWord);

    res.json(products);
  } catch (err) {
    next(err);
  }
};
