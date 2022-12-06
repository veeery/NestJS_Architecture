import { InjectRepository } from "@nestjs/typeorm";
import { SuccessResponse } from "src/common/interfaces/response.interface";
import { Repository } from 'typeorm';
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

export class DashboardService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async getDashoardInfo(): Promise<SuccessResponse<any>>{

    const product = await this.productRepository.find();
    const productTotal = product.length;

    const emptyProduct = await this.productRepository.createQueryBuilder("product").where("product.qty = :qty", {qty:0}).limit(5).getMany();

    const user = await this.userRepository.find();
    const userTotal = user.length;

    const data = {
      product_total : productTotal,
      empty_product : emptyProduct,
      user_total : userTotal,
    }

    return {data: data};

  }
}