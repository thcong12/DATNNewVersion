let header = `<body style="margin: 0; width: 100%">
<header
  style="
    background-color: #141415;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  "
>
  <a href="">
    <img
      src="https://themepixer.com/demo/html/halda/halda/assets/img/logo/logo.png"
    />
  </a>
</header>`

let activeContent = (userName,link)=>` <div
style="
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #212121;
  min-height: 450px;
  padding: 20px 0;
"
>
<div
  style="
    background-color: #495057;
    padding: 20px 2.5%;
    display: flex;
    flex-direction: column;
    width: 20%;
    align-items: center;
    justify-content: space-between;
  "
>
  <img
    align="center"
    border="0"
    src="images/image-4.png"
    style="
      outline: none;
      text-decoration: none;
      clear: both;
      display: inline-block !important;
      border: none;
      height: auto;
      float: none;
      width: 30%;
      max-width: 159px;
    "
    width="159"
  />

  <p
    style="
      padding-top: 20px;
      text-align: start !important;
      color: #eeeeee;
    "
  >
    <b>Hello ${userName}</b><br />Bước cuối cùng để kích hoạt tài khoản<br />Vui lòng
    bấm vào đường linh bên dưới để kích hoạt tài khoản
  </p>
  <a href='${link}' style="width: 100%; font-size: 14px; padding: 10px 0">
    Click here
  </a>
  <p
    style="
      padding-top: 20px;
      text-align: start !important;
      color: #eeeeee;
    "
  >
    Phần này là phần cảm ơn
  </p>
</div>
</div>`

let footer = `<footer
style="
  background: url(https://ci6.googleusercontent.com/proxy/1e25JlGDJRWJTkOg6WvT9YQD50lFFDRn-jYrLHbom1i1wOauiNQsiafZ-NhkoVpVAQQ5k6GjVXsaAzJs2M94N-ImmRHP_GGuLv7ZP7g2LzklSW3OHqEOca5E0p-UXtlE4J2VykrojW6GcNLHs2fIYA=s0-d-e1-ft#https://themebeyond.com/demo/gecolive/wp-content/themes/geco/assets/images/bg/s_footer_bg.jpg);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
"
>
<div
  style="
    display: flex;
    justify-content: space-between;
    min-height: 40%;
    gap: 40px;
    border-bottom: 3px solid #eeeeee;

    padding: 20px 5% 30px;
  "
>
  <img width="50px" height="50px" src="images/image-1.png" />
  <img width="50px" height="50px" src="images/image-2.png" />
  <img width="50px" height="50px" src="images/image-3.png" />
</div>
<div
  style="
    display: flex;
    justify-content: space-between;
    min-height: 20%;
    gap: 20px;
    padding: 20px 5% 30px;
    width: 30%;
  "
>
  <p style="color: #eeeeee; width: 50%">
    123-456-7890 San Francisco, CA. United States Terms of use | Privacy
    Policy
  </p>
  <p style="color: #eeeeee; width: 50%">
    Want to change how you receive these emails? Update your preferences
    or unsubscribe
  </p>
</div>
</footer>
</body>`



export const activeAccount = (userName,link)=>{
    return  header + activeContent(userName,link) + footer
   
}
export const checkoutProduct=()=>{
    return  header + activeContent(userName,link) + footer
}