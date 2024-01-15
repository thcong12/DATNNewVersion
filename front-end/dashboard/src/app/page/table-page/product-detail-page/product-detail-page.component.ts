import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  providers: [MessageService],
})
export class ProductDetailPageComponent implements OnInit {
  public displayModalCategolry!: boolean;
  public displayModdalDescription!: boolean;
  public displayModalSystemRequiment!: boolean;

  public productForm!: FormGroup;
  public hideControl: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;
  product: Product.Display = {} as Product.Display;
  productId: string = '';
  products123?: Product.Product;
  statuses: any[] = [];

  public defaultimg = {
    img1: 'assets/image/default_Img_x.jpg',
    img2: 'assets/image/default_Img_y.jpg',
  };
  public text1!: any;

  constructor(
    private route: ActivatedRoute,
    private message: MessageService,
    private productSv: ProductsService,
    private formBuilder: FormBuilder
  ) {}
  public getProduct() {
    this.route.paramMap
      .pipe(
        tap((param) => {
          if (param.get('id')) {
            this.productId = String(param.get('id'));
          }
        })
      )
      .subscribe({
        next: () => {
          if (this.productId) {
            this.productSv.getProduct(this.productId).subscribe({
              next: (res) => {
                this.product = res;
                console.log(res);
              },
            });
          }
        },
      });
  }
  submitProductData(event: any) {
    let dataAfterFormat: Product.Product = {
      ...event,
      imgX: {
        url: event.imgX,
        title: 'anh doc',
      },
      imgY: {
        url: event.imgY,
        title: 'anh ngang',
      },
      sale: {
        salePersent: event.salePersent,
        startDay: event.startDay,
        endDay: event.endDay,
      },
    };
    this.products123 = dataAfterFormat;
    this.productSv.createProduct(this.products123).subscribe();
  }
  submitProductDetailData(event: any) {
    this.productSv.putProductDetail(this.productId, event).subscribe({
      next: () => {
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product had changed ',
        });
      },
    });
  }
  ngOnInit(): void {
    this.getProduct();
  }
}
