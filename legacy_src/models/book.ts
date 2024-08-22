import { AuthorServerModel } from './author';
import { WritingServerModel } from './writing';

export interface BookServerModel {
  id: number;
  isbn: string;
  authors: AuthorServerModel[];
  writings: WritingServerModel[];
  info: {
    title: string;
    link: string;
    author: string;
    pubDate: string;
    description: string;
    isbn: string;
    isbn13: string;
    itemId: number;
    priceSales: number;
    priceStandard: number;
    mallType: string;
    stockStatus: string;
    mileage: number;
    cover: string;
    categoryId: number;
    categoryName: string;
    publisher: string;
    salesPoint: number;
    adult: boolean;
    fixedPrice: boolean;
    customerReviewRank: number;
    subInfo: {
      ebookList: unknown[];
      usedList: {
        aladinUsed: {
          itemCount: number;
          minPrice: number;
          link: string;
        };
        userUsed: {
          itemCount: number;
          minPrice: number;
          link: string;
        };
        spaceUsed: {
          itemCount: number;
          minPrice: number;
          link: string;
        };
      };
      subTitle: string;
      originalTitle: string;
      itemPage: number;
      ratingInfo: {
        ratingScore: number;
        ratingCount: number;
        commentReviewCount: number;
        myReviewCount: number;
      };
      packing: {
        styleDesc: string;
        weight: number;
        sizeDepth: number;
        sizeHeight: number;
        sizeWidth: number;
      };
      c2bsales: number;
      subBarcode: string;
    };
  };
}
