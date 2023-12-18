let style = `<style>
body {

}
.pageBody {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #212121;
  min-height: 450px;
  padding: 20px 0;
}
.pageBody div {
  
  padding: 20px 2.5%;
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
  justify-content: space-between;
}
.pageBody div p {
  padding-top: 20px;
  text-align: start !important;
}
.pageBody div button {
  width: 100%;
  font-size: 14px;
  padding: 10px 0;
}
footer {
  background: url(https://ci6.googleusercontent.com/proxy/1e25JlGDJRWJTkOg6WvT9YQD50lFFDRn-jYrLHbom1i1wOauiNQsiafZ-NhkoVpVAQQ5k6GjVXsaAzJs2M94N-ImmRHP_GGuLv7ZP7g2LzklSW3OHqEOca5E0p-UXtlE4J2VykrojW6GcNLHs2fIYA=s0-d-e1-ft#https://themebeyond.com/demo/gecolive/wp-content/themes/geco/assets/images/bg/s_footer_bg.jpg);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}
footer div {
  display: flex;
  justify-content: space-between;
  min-height: 40%;
  gap: 40px;
  border-bottom: 3px solid #eeeeee;

  padding: 20px 5% 30px;
}
</style>`;

let header = `<body style='  color: #eeeeee;margin: 0;width: 100%;'> 
<header>
  <h3 style='color: white;' href="">Store</h3>
</header>`;

let activeContent = (userName: string, link: string) => ` 
<div style="background-color: #495057;">
      <div>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xml:space="preserve"
          width="100px"
          height="100px"
          fill="#000000"
          stroke="#000000"
          stroke-width="0.00512"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle style="fill: #386895" cx="256" cy="256" r="256"></circle>
            <path
              style="fill: #273b7a"
              d="M511.902,249.006l-49.895-49.895l-149.118,28.444L84.471,357.047l154.367,154.367 C244.512,511.79,250.232,512,256,512c141.384,0,256-114.616,256-256C512,253.661,511.964,251.33,511.902,249.006z"
            ></path>
            <path
              style="fill: #ffffff"
              d="M462.007,199.111l-102.815-89.967c-4.387-3.839-11.89-1.121-11.89,4.31v39.776h-171.48 c-6.654,0-12.05,4.72-12.05,10.545v70.677c0,5.823,5.396,10.545,12.05,10.545H347.3v39.776c0,5.43,7.502,8.149,11.89,4.31 L462.007,199.111z"
            ></path>
            <rect
              x="84.471"
              y="199.111"
              style="fill: #fee187"
              width="236.899"
              height="157.927"
            ></rect>
            <rect
              x="202.852"
              y="199.111"
              style="fill: #ffc61b"
              width="118.529"
              height="157.927"
            ></rect>
            <polygon
              style="fill: #e59413"
              points="321.376,199.111 202.924,278.08 84.471,199.111 "
            ></polygon>
            <polygon
              style="fill: #d48b07"
              points="321.376,199.111 202.847,199.111 202.847,278.028 202.924,278.08 "
            ></polygon>
          </g>
        </svg>
  <p>
    <b>Hello ${userName}</b><br />Bước cuối cùng để kích hoạt tài khoản<br />Vui lòng
    bấm vào đường linh bên dưới để kích hoạt tài khoản
  </p>
  <a href='${link}' style="width: 100%; font-size: 14px; padding: 10px 0">
    Click here
  </a>
  <p>
    Phần này là phần cảm ơn
  </p>
</div>
</div>`;

let footer = `<footer>
<div>
  <img width="50px" height="50px" src="images/image-1.png" />
  <img width="50px" height="50px" src="images/image-2.png" />
  <img width="50px" height="50px" src="images/image-3.png" />
</div>
</footer>
</body>`;

export const activeAccount = (userName: string, link: string) => {
  return header + activeContent(userName, link) + footer;
};
// export const checkoutProduct = () => {
//   return header + activeContent(userName, link) + footer;
// };
