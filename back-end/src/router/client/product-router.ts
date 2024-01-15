import expressAsyncHandler from "express-async-handler";
import { BaseRouter, MyToken } from "../../base/router-base";
import { ProductController } from "../../controller/product-controller";
import { NextFunction, Request, Response } from "express";
import { HomePageController } from "../../controller/home-page-controller";
import { CategloryController } from "../../controller/category-controller";
import { CONSTANT } from "../../constant";
import { checkSection } from "../../ultils/genareate_token";

export class ProductRouter extends BaseRouter {
  private Product: ProductController = new ProductController();
  private HomePage: HomePageController = new HomePageController();
  private Category: CategloryController = new CategloryController();

  constructor() {
    super();
    this.importRouter();
  }
  importRouter() {
    this.getAll();
    this.getProductHomeSlide();
    this.getProductBestSeller();
    this.getProductNewRelease();
    this.getProductSale();
    this.getDataFilter();
    this.searchProduct();
    this.categoryList();
    this.getProductDetail();
    this.getProductDetailIslogin();
  }
  getAll() {
    this.router.get(
      "",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.Product.getAllproduct(200);
          res.json(data);
        }
      )
    );
  }
  getProductDetail() {
    this.router.get(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const productId = req.params.id;
          const authHeader: any = req.header(CONSTANT.header.accessToken);
          if (authHeader) {
            const user: MyToken = checkSection(req, res, next);
            await this.RecomendController.updateData(
              user.id!,
              "click",
              productId
            );
          }
          const product = await this.HomePage.getProductDetail(productId);
          res.json(product[0]);
        }
      )
    );
  }
  getProductDetailIslogin() {
    this.router.get(
      "/recomend/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const productId = req.params.id;
          const authHeader: any = req.header(CONSTANT.header.accessToken);
          if (authHeader) {
            const user: MyToken = checkSection(req, res, next);
            await this.RecomendController.updateData(
              user.id!,
              "click",
              productId
            );
          }
          const product = await this.HomePage.getProductDetail(productId);
          res.json(product[0]);
        }
      )
    );
  }
  getProductBestSeller() {
    this.router.get(
      "/bestseller",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const bestseller = await this.HomePage.getBestSeller();
          res.json(bestseller);
        }
      )
    );
  }
  getProductNewRelease() {
    this.router.get(
      "/release",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const newrelease = await this.HomePage.getProductNewRelease();
          res.json(newrelease);
        }
      )
    );
  }
  getProductHomeSlide() {
    this.router.get(
      "/slide",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.HomePage.getProductSlide();
          res.json(data);
        }
      )
    );
  }
  getProductSale() {
    this.router.get(
      "/sale",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.HomePage.getProductSale();
          res.json(data);
        }
      )
    );
  }
  getDataFilter() {
    this.router.post(
      "/filter",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.HomePage.filterProduct(req);
          res.json(data);
        }
      )
    );
  }
  searchProduct() {
    this.router.post(
      "/search",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const { keyword } = req.body;

          const data = await this.HomePage.searchProduct(keyword);
          res.json(data);
        }
      )
    );
  }
  categoryList() {
    this.router.get(
      "/cate",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          let data = await this.Category.getAllData();
          data = data.filter((item: any) => {
            return item.image != "";
          });
          res.json(data);
        }
      )
    );
  }
}
