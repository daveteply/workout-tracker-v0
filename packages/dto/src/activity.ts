export interface ActivityDTO {
  id?: number;
  slug?: string;

  categoryId?: number;
  categorySlug?: string;

  title: string;
  description?: string;
}

export interface UpdateActivityDTO {
  title: string;
  description?: string;
}
