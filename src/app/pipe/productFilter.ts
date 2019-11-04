import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Product } from '../data';

@Pipe({
  name: 'productFilter'
})

@Injectable()
export class ProductFilter implements PipeTransform {
  // tslint:disable:prefer-for-of

  transform(list: any, searchText: any, category: any, productName: any, productCode: any): any {

    if (((searchText.length > 0) || (category.length > 0) || (productName.length > 0) || (productCode.length > 0))) {
      let temp: Product[] = [];

      const tempCat: Product[] = [];

      for (let i = 0; i < list.length; i++) {
        if ((this.hasSearchTextInContext(list[i].category, category))
          && (this.hasSearchTextInContext(list[i].productCode, productCode))
          && (this.hasSearchTextInContext(list[i].productName, productName))) {
          tempCat.push(list[i]);
        }
      }
      temp = tempCat;

      if (searchText.length > 0) {
        searchText = searchText.trim();

        if (temp.length === 0) {
          for (let i = 0; i < list.length; i++) {

            if (this.hasSearchTextInContext(list[i].productName, searchText) ||
              this.hasSearchTextInContext(list[i].productCode, searchText)) {
              temp.push(list[i]);
            }
          }
        } else {

          const tempSearch: Product[] = [];

          for (let i = 0; i < temp.length; i++) {
            if (this.hasSearchTextInContext(temp[i].productName, searchText) ||
              this.hasSearchTextInContext(temp[i].productCode, searchText)) {
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

  hasSearchTextInContext(searchContext: string, searchText: string) {
    return searchContext.toUpperCase().includes(searchText.toUpperCase());
  }
}

