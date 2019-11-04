import { Component } from '@angular/core';
import { ProductDetailsData } from './data/product.details.data';
import { Product } from './data/product.details.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.getCategories();
    this.getProductNames();
    this.getProductCodes();

    this.total = this.productDetails.length;
  }

  productDetails: Product[] = ProductDetailsData;
  selectedProducts: Product[] = [];
  categories: any = [];
  productNames: any = [];
  productCodes: any = [];

  selectedCategory = '';
  searchProductPattern = '';
  selectedProductName = '';
  selectedProductCode = '';

  allUserSelectCheckBox = false;

  // PAGINATION FIELDS
  pageSize: any = 10;
  p: any = 1;
  total: any = 0;

  getCategories() {
    for (let i = 0; i < this.productDetails.length; i++) {
      if (!this.categories.includes(this.productDetails[i].category)) {
        this.categories.push(this.productDetails[i].category);
      }
    }
  }

  getProductNames() {
    for (let i = 0; i < this.productDetails.length; i++) {
      if (!this.productNames.includes(this.productDetails[i].productName)) {
        this.productNames.push(this.productDetails[i].productName);
      }
    }
  }

  getProductCodes() {
    for (let i = 0; i < this.productDetails.length; i++) {
      if (!this.productCodes.includes(this.productDetails[i].productCode)) {
        this.productCodes.push(this.productDetails[i].productCode);
      }
    }
  }

  pageChanged(event: any) {
    this.p = event;
  }

  checkBoxChanged(productId: any) {

    this.allUserSelectCheckBox = false;

    if (this.isProductExist(productId) === false) {
      this.selectedProducts.push(this.productDetails.find((product) => product.id === productId));
      const productIndex = this.productDetails.findIndex((product) => product.id === productId);
      this.productDetails[productIndex].checkBoxEnabled = true;
    } else {

      this.selectedProducts = this.selectedProducts.filter(
        (product) => product.id !== productId
      );
      const productIndex = this.productDetails.findIndex((product) => product.id === productId);
      this.productDetails[productIndex].checkBoxEnabled = false;
    }

  }

  isProductExist(productId: any): boolean {

    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (this.selectedProducts[i].id === productId) {
        return true;
      }
    }

    return false;
  }

  toggleAll() {

    if (this.allUserSelectCheckBox === false) {
      this.selectedProducts = [];

      for (let productCount = 0; productCount < this.productDetails.length; productCount++) {
        this.selectedProducts.push(this.productDetails[productCount]);
        this.productDetails[productCount].checkBoxEnabled = true;
      }
    } else if (this.allUserSelectCheckBox === true) {
      this.selectedProducts = [];
      for (let productCount = 0; productCount < this.productDetails.length; productCount++) {
        this.productDetails[productCount].checkBoxEnabled = false;
      }
    }
    this.allUserSelectCheckBox = !this.allUserSelectCheckBox;

  }

  makeVisible() {
    for (let i = 0; i < this.productDetails.length; i++) {
      for (let j = 0; j < this.selectedProducts.length; j++) {
        if (this.productDetails[i].id === this.selectedProducts[j].id) {
          this.productDetails[i].visible = true;
        }
      }
    }
    this.reset();
  }

  makeInVisible() {
    for (let i = 0; i < this.productDetails.length; i++) {
      for (let j = 0; j < this.selectedProducts.length; j++) {
        if (this.productDetails[i].id === this.selectedProducts[j].id) {
          this.productDetails[i].visible = false;
        }
      }
    }
    this.reset();
  }

  delete() {
    for (let i = 0; i < this.selectedProducts.length; i++) {

      this.productDetails = this.productDetails.filter(
        (product) => product.id !== this.selectedProducts[i].id
      );
    }
    this.selectedProducts = [];
    this.total = this.productDetails.length;

    this.reset();

  }

  reset() {

    this.allUserSelectCheckBox = false;

    for (let i = 0; i < this.productDetails.length; i++) {
      this.productDetails[i].checkBoxEnabled = false;
    }
    this.selectedProducts = [];
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchProductPattern = '';
    this.selectedProductName = '';
    this.selectedProductCode = '';
  }

}
