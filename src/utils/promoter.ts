import { CatListItem, PromoterData, SeparatedData } from "./types";

export const separatePromoterData = (data: any[] = []): SeparatedData => {
  let objectsArray: PromoterData[] = [];
  let array1: PromoterData[] = [];
  let array2: any[] = [];

  for (const element of data) {
    if (Array.isArray(element)) {
      if (array1.length === 0) {
        array1 = element as PromoterData[];
      } else if (array2.length === 0) {
        array2 = element;
      }
    } else if (typeof element === "object" && element !== null) {
      objectsArray.push(element as PromoterData);
    }
  }

  const catList: CatListItem[] = [];
  for (const catItem of array1) {
    const existingItem = catList.find(
      (it) => it?.category_id === catItem?.category_id
    );

    if (!existingItem) {
      const uniqueCategoryIds = new Set<number>();
      const result: number[] = [];

      for (const obj1 of array1) {
        for (const obj2 of array1) {
          if (
            obj1.category_id === obj2.category_id &&
            !uniqueCategoryIds.has(Number(obj1.category_id)) &&
            catItem.category_id === obj1.category_id
          ) {
            result.push(obj1.promoter_id || 0); // Use appropriate default value
            uniqueCategoryIds.add(obj1.promoter_id || 0); // Use appropriate default value
          }
        }
      }

      catList.push({
        category_id: catItem.category_id || 0, // Use appropriate default value
        category_name: catItem.category_name,
        promoter_id: catItem.promoter_id,
        promoter_id_list: result,
      });
    } else {
      existingItem.promoter_id_list.push(catItem?.promoter_id || 0); // Use appropriate default value
    }
  }

  objectsArray = objectsArray.map((item): any => {
    let templist = catList.filter((it): any => it.promoter_id === item.id);

    let category_id_list =
      templist.length > 0 ? templist.map((it) => it.category_id) : [];

    return { ...item, category_id_list: category_id_list };
  });

  return {
    promoterList: objectsArray,
    categoryList: catList,
    ratingList: array2,
  };
};
