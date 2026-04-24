export type ProductBadge = "new" | "popular" | "sale";

interface BadgeProductInput {
  createdAt: Date;
  soldCount?: number;
  viewCount?: number;
  discount?: number;
  price: number;
}

export const computeProductBadges = (
  product: BadgeProductInput,
): ProductBadge[] => {
  const badges: ProductBadge[] = [];

  const addBadge = (badge: ProductBadge) => {
    if (!badges.includes(badge)) badges.push(badge);
  };

  // NEW
  const days = Math.floor(
    (Date.now() - new Date(product.createdAt).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (days <= 14) {
    addBadge("new");
  }

  // POPULAR
  if ((product.soldCount || 0) >= 50 || (product.viewCount || 0) >= 1000) {
    addBadge("popular");
  }

  // SALE
  if ((product.discount || 0) > 0) {
    addBadge("sale");
  }

  return badges;
};
