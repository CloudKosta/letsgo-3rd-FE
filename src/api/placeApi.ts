import { api } from "./axiosInstance";
import type { PlaceDTO } from "../screens/place/interface";

export type PlaceTab = "LEISURE" | "STAY" | "RESTAURANT";

export interface PlaceItem {
  placeId: number;
  title: string;
  addr1: string;
  firstImage: string;
  placeType: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

const ENDPOINT: Record<PlaceTab, string> = {
  LEISURE: "/leisureListAjax",
  STAY: "/stayListAjax",
  RESTAURANT: "/restaurantListAjax",
};

const PAGED_ENDPOINT: Record<PlaceTab, string> = {
  LEISURE: "/list/leisure",
  STAY: "/list/stay",
  RESTAURANT: "/list/restaurant",
};

export const PLACE_PAGE_SIZE = 12;

export async function searchPlaces(tab: PlaceTab, keyword: string): Promise<PlaceItem[]> {
  const res = await api.get<PlaceItem[]>(ENDPOINT[tab], {
    params: { category: null, keyword: keyword || null },
  });
  return res.data;
}

export interface FetchPlacePageParams {
  category: string | null;
  keyword: string;
  page: number;
}

export async function fetchPlacePage(
  tab: PlaceTab,
  { category, keyword, page }: FetchPlacePageParams
): Promise<PageResponse<PlaceDTO>> {
  const res = await api.get<PageResponse<PlaceDTO>>(PAGED_ENDPOINT[tab], {
    params: {
      category,
      keyword: keyword || null,
      page,
      size: PLACE_PAGE_SIZE,
    },
  });
  return res.data;
}
