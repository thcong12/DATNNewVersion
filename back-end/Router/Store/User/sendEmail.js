import nodemailer from "nodemailer";


export function createEmailTemplate(order,order1,discountAmount) {
    const dateTime  = order1.updatedAt
    const totalPrice  = 0;

  const html1 = `<head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /<title>Document</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" /></head><body style="margin: 0; width: 100%"><header class="d-flex justify-content-center" style="background-color: rgb(31, 32, 41); padding: 3% 10%"> <a><img src="https://themepixer.com/demo/html/halda/halda/assets/img/logo/logo.png" width="70%" /></a></header><div style="background-color: rgb(28, 17, 31);min-height: 300px;padding: 3% 10%;"><span style="font-size: 50px; font-weight: 300; color: #eeeeeeee">Thank you for your order</span><div class="p-4" style=" display: flex; justify-content: start;  color: #eeeeeeee;  background-color: #393e46; "><div style="width: 50%"> <h4>OrderID: ${order._id}</h4> <h4>${dateTime}</h4></div><div style="width: 50%"><h4>Payment method: paypal</h4><h4>Paid At: 11/30/22, 8:53 AM</h4></div></div> <table class="table mt-2" style="background-color: #393e46"> <thead>  <tr class="row px-3" style="color: #eeeeeeee"> <th scope="col" class="col-sm-4">ITEMS ORDERED</th><th scope="col" class="col-sm-4">NAME</th><th scope="col" class="col-sm-4">PRICE</th></tr> </thead><tbody>`;
  const html2 = order.map((item) => {
    totalPrice += item.totalPrice;
    return `<tr class="row px-3" style="color: #eeeeeeee"><td class="col-sm-4 "><img src="${item.imgY.url}" width="50%" /></td><td class="col-sm-4 fs-3 d-flex align-items-center">${item.productName}</td><td class="col-sm-4 fs-3 d-flex align-items-center">${item.price}</td></tr>`;
  });
  const html3 = `</tbody></table><div class="d-flex flex-column align-items-end" style="padding: 3% 0;"><span class="fs-3" style="color: #eeeeeeee;">Subtotal (3 items): <b>${totalPrice}</b></span><span class="fs-3" style="color: #eeeeeeee;">Discount: <b>${discountAmount}</b></span><hr><span class="fs-3" style="color: #eeeeeeee;">Total: <b>${totalPrice- (totalPrice*discountAmount)/100}</b></span></div></div><footer style="background: url(https://themebeyond.com/demo/gecolive/wp-content/themes/geco/assets/images/bg/s_footer_bg.jpg);min-height: 300px;display: flex; align-items: center; padding: 0 10%;"><div style="color: #eeeeeeee; width: 50%"><img src="https://themepixer.com/demo/html/halda/halda/assets/img/logo/logo.png" width="20%" /><hr /><h5>Phone : 097*****69</h5> <hr /><h5>Email : nvtcshop@gmail.com</h5> <hr /><h5>Address : PO Box W75 Street lan West new queens</h5> </div><div style="text-align: center; width: 50%; color: #eeeeeeee"><h1>Follow us</h1><div class="d-flex justify-content-center align-items-center gap-1"></div></div></footer></body>`;
 
  return html1 + html2 + html3;
}

