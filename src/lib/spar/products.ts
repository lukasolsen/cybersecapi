import { db } from "../../data-source";
import { BrowseProducts } from "../../types/browseProducts";
import { Products } from "../../types/products";
import api from "../apiHandler";

interface getProductProps {
  page: string;
  page_size: string;
  full_response: string;
  fieldset: string;
  facets: string;
  showNotForSale: string;
}

export const getProducts = async (
  props: getProductProps
): Promise<Products> => {
  try {
    const response = await api.get(
      `/products/1210/7080001097950?page=${props.page || 1}&page_size=${props.page_size || 20}&full_response=${props.full_response || true}&fieldset=${props.facets || "maximal"}&facets=Category%2CAllergen&showNotForSale=${props.showNotForSale || false}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface getProductsByQueryProps {
  query: string;
  page: string;
  page_size: string;
  full_response: string;
  fieldset: string;
  facets: string;
  showNotForSale: string;
}

export const getProductsByQuery = async (
  props: getProductsByQueryProps
): Promise<BrowseProducts> => {
  try {
    const response = await api.get(
      `/episearch/1210/products?search=${props.query || ""}&page_size=${props.page_size || 20}&suggest=true&page=${props.page || 1}&types=suggest%2Carticles%2Crecipes%2Cstores&store_id=7080001097950&popularity=true&sort=&facet=&full_response=true&showNotForSale=true`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const findProduct = async (id: string) => {
  try {
    const response = await api.get(
      `https://platform-rest-prod.ngdata.no/api/products/1210/7080001097950?ids=${id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
