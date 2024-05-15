import { BrowseProducts } from "../types/browseProducts";
import { Products } from "../types/products";
import { calculateMarkup } from "./balance";

export const sanitizeProducts = (data: Products) => {
  const filteredData = data.hits.hits.filter((hit) => {
    return hit._source.ageLimit <= 14;
  });

  return filteredData.map((hit) => {
    return {
      id: hit._id,
      title: hit._source.title,
      description: hit._source.description,

      price: calculateMarkup(hit._source.pricePerUnit, 20),
      imagePath: `https://bilder.ngdata.no/${hit._source.ean}/kmh/medium.jpg`,

      categoryName: hit._source.categoryName,
      unitType: hit._source.unitType,

      ageLimit: hit._source.ageLimit,
      recycleValue: hit._source.recycleValue,
    };
  });
};

export const sanitizeBrowseProducts = (data: BrowseProducts) => {
  const filteredData = data.hits.hits.filter((hit) => {
    return hit.contentData._source.ageLimit <= 14;
  });

  return filteredData.map((hit) => {
    return {
      id: hit.contentData._id,
      title: hit.title,
      description: hit.description,

      price: calculateMarkup(hit.contentData._source.pricePerUnit, 20),
      imagePath: `https://bilder.ngdata.no/${hit.contentData._source.ean}/kmh/medium.jpg`,
      categoryName: hit.contentData._source.categoryName,
      unitType: hit.contentData._source.unitType,

      ageLimit: hit.contentData._source.ageLimit,
      recycleValue: hit.contentData._source.recycleValue,
    };
  });
};
