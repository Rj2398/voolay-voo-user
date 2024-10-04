export interface PromoterData {
  category_id?: number;
  promoter_id?: number;
  category_name: string;
  id: number;
  // Add other properties as needed
}

export interface CatListItem {
  category_id: number;
  category_name: string;
  promoter_id: any;
  promoter_id_list: number[];
}
export interface SeparatedData {
  promoterList: PromoterData[];
  categoryList: CatListItem[];
  ratingList: any[]; // Adjust the type as per your actual data
}
