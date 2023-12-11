class Pearson_correlation {
  protected existp1p2: any[] = [];
  protected p1_sum: number = 0; //tổng p1
  protected p2_sum: number = 0; //tổng p2
  protected p1_sq_sum: number = 0; //tổng bình phương p1
  protected p2_sq_sum: number = 0; //tổng bình phương p2
  protected prod_p1p2: number = 0; //tổng tích p1 p2
  protected p1_cur: number = 0;
  protected p2_cur: number = 0;
  protected num_existence = 0;
  private User1Product: any = [];
  constructor(private person1st: any, private person2st: any) {}
}
