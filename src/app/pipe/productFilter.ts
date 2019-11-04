import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Product } from '../data/product.details.data';

@Pipe({
  name: 'productFilter'
})

@Injectable()
export class ProductFilter implements PipeTransform {

  transform(list: any, searchText: any, category: any, productName: any, productCode: any): any {

    if (((searchText.length > 0) || (category.length > 0) || (productName.length > 0) || (productCode.length > 0))) {
      let temp: Product[] = [];

      const tempCat: Product[] = [];

      for (let i = 0; i < list.length; i++) {
        if ((list[i].category.toUpperCase().includes(category.toUpperCase()))
          && (list[i].productCode.toUpperCase().includes(productCode.toUpperCase()))
          && (list[i].productName.toUpperCase().includes(productName.toUpperCase()))) {
          tempCat.push(list[i]);
        }
      }
      temp = tempCat;

      if (searchText.length > 0) {
        searchText = searchText.trim();

        if (temp.length === 0) {
          for (let i = 0; i < list.length; i++) {

            if (list[i].productName.toUpperCase().includes(searchText.toUpperCase()) ||
              list[i].productCode.toUpperCase().includes(searchText.toUpperCase())) {
              temp.push(list[i]);
            }
          }
        } else {

          const tempSearch: Product[] = [];

          for (let i = 0; i < temp.length; i++) {
            if (temp[i].productName.toUpperCase().includes(searchText.toUpperCase()) ||
              temp[i].productCode.toUpperCase().includes(searchText.toUpperCase())) {
              tempSearch.push(temp[i]);
            }
          }

          temp = tempSearch;
        }

      }

      return temp;
    } else {
      return list;
    }

  }
}
