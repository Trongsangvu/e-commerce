type SearchableFields = string[];

export const buildSearchFilter = (
  search?: string,
  fields: SearchableFields = [],
) => {
  if (!search || !fields.length) return {};

  const regex = { $regex: search, $options: "i" };

  return {
    $or: fields.map((field) => ({
      [field]: regex,
    })),
  };
};
