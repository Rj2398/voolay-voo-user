export function findSubCategory(selectionList: any[], subCategory: any) {
  for (const category of selectionList) {
    const foundSubCategory = category.subCategoryArray.find(
      (sub: any) =>
        sub?.sub_category_id === subCategory?.sub_category_id &&
        sub?.sub_category_name === subCategory?.sub_category_name
    );
    if (foundSubCategory) {
      return foundSubCategory;
    }
  }
  return null;
}
