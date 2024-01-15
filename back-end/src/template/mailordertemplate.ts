import { IAuthBase } from "../model/base/auth";
import { IOrder } from "../model/user/CheckOut";

const header = (username: string, orderId: any, date: any) => {
  return `<div style="padding:0;margin:0;height:100%;width:100%;font-family:Arial,'Times New Roman','Calibri'"><div class="adM">
</div><div style="margin:0 auto;max-width:600px;display:block;font-family:inherit"><div class="adM">
  </div><table cellpadding="0" cellspacing="0" style="padding:0;border-spacing:0;background:#f0f0f0;border:0;margin:0;text-align:center;vertical-align:middle;font-weight:500;table-layout:fixed;border-collapse:collapse;height:100%;width:100%;line-height:100%" width="100%" height="100%" align="center" valign="middle">
    <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
        <td style="margin:0;padding:0;border:none;border-spacing:0;background:#f0f0f0;border-collapse:collapse;font-family:inherit">
          <table cellpadding="0" cellspacing="0" style="margin:0;border-spacing:0;border:0;padding:0;width:100%;border-collapse:collapse" width="100%">
            <tbody>

              <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:24px;border-collapse:collapse;font-family:inherit" height="24">
                  <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
                </td>
              </tr>
              <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
                  <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
                    <tbody>
                      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                        <td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
                          <div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
                        </td>
                        <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
                          <h1 style="font-size:32px;font-weight:500;letter-spacing:0.01em;color:#141212;text-align:center;line-height:39px;margin:0;font-family:inherit">
                            Your order
                          </h1>
                        </td>
                        <td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
                          <div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
                  <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
                    <tbody>
                      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                        <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:64px;border-collapse:collapse;font-family:inherit" height="64">
                          <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
                        </td>
                      </tr>
                      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                        <td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
                          <div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
                        </td>
                        <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
                          <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;background-color:#f9f9f9;border-collapse:collapse" width="100%" bgcolor="#F9F9F9">
                            <tbody>
                              <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                                <td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:38px;border-collapse:collapse;font-family:inherit" width="38" height="100%">
                                  <div style="height:100%;overflow:hidden;width:38px;font-family:inherit"></div>
                                </td>
                                <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:start;border-collapse:collapse;font-family:inherit" align="center">
                                  <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;table-layout:fixed;border-collapse:collapse" width="100%">
                                    <tbody>
                                      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
                                        <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:40px;border-collapse:collapse;font-family:inherit" height="40">
                                          <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
                                        </td>
                                      </tr>
                                   
                                      <tr style="border-bottom: 1px solid #666;">
                                        <td>
                                          <p style="margin:0;padding:0;font-weight:500;font-size:18px;line-height:140%;letter-spacing:-0.01em;color:#666;margin-top:8px;font-family:inherit;min-width:300px">
                                            Hello ${username},
                                            <br><br>
                                            Order Id: ${orderId}
                                            <br><br>
                                            Date: ${date}
                                            <br><br>
                                            Order Item
                                          </p>
                                        </td>
                                      </tr>`;
};

const footer = (link: string, total: any) => {
  return `  
  <tr style="border-top: 1px solid #666;">
                                      <td>
                                        <p style="margin:0;padding:0;font-weight:500;font-size:18px;line-height:140%;letter-spacing:-0.01em;color:#666;margin-top:8px;font-family:inherit;min-width:300px">
                                          Total: ${total}.00$,
                                        </p>
                                      </td>
                                    </tr>
  <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
  <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
    <div style="font-family:inherit">
      <a href="${link}" style="min-width:340px;background:#d13639;border-radius:12.8px;padding:20px 19px 21px 19px;text-align:center;font-size:18px;font-weight:700;color:#f9f9f9;display:inline-block;text-decoration:none;line-height:120%" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:4200/login/actice/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWVhNGExNTczZmY0NmY3N2JhNzE4OSIsImlhdCI6MTcwNDg5NTY0OSwiZXhwIjoxNzA1NTAwNDQ5fQ.D6FUYh3hDmS9bK7ac-ToCBHSY0n_PDmlJtTES6ANqec&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw1by3aWlCab8JalNYaIWvNF">Continue shopping</a>
    </div>
  </td>
</tr>


</tbody>
</table>
</td>
<td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:38px;border-collapse:collapse;font-family:inherit" width="38" height="100%">
<div style="height:100%;overflow:hidden;width:38px;font-family:inherit"></div>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:48px;border-collapse:collapse;font-family:inherit" height="48">
</td>
</tr>

</tbody>

</table>

</td>
<td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
<div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:48px;border-collapse:collapse;font-family:inherit" height="48">
<table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
<table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;font-size:16px;text-align:center;line-height:140%;letter-spacing:-0.01em;color:#666;border-collapse:collapse" width="100%" align="center">

</table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
<table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
<tbody>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
<div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
</td>
<td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
<table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;font-size:11.24px;line-height:140%;letter-spacing:-0.01em;color:#999;table-layout:fixed;border-collapse:collapse" width="100%">
<tbody>

<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
<table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
<tbody>
  <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
    <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;table-layout:fixed;border-collapse:collapse" width="100%">
        <tbody>
          <tr style="margin:0;padding:0;border:none;border-spacing:0;height:44px;width:100%;border-collapse:collapse;font-family:inherit">
            <td style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit"></td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:44px;height:44px;border-collapse:collapse;font-family:inherit" width="44" height="44">
              <a href="https://links.riotgames.com/ls/click?upn=frHghcUMWgUZ9OUHJJkDdWcKZDM57kpBql7-2Fw1LzrEq9dtNQF4FoTTh6S7-2FI8CcCpeS4_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nCIiNAJNE4qcK6jZQrCFj3QJ5CxPx-2Bya-2BBtuhi4trOVemFaYV5009sO27x4jVxHC7Cvi98rarf9zBCNfrZqNy48-2FJtPC9tFJbbOCeA8f1o1YqFZb0E7ortvU02K-2BNLNlYR0jyHAI91tBn9PtRWUQ2Z2" style="color:#bd2225;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://links.riotgames.com/ls/click?upn%3DfrHghcUMWgUZ9OUHJJkDdWcKZDM57kpBql7-2Fw1LzrEq9dtNQF4FoTTh6S7-2FI8CcCpeS4_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nCIiNAJNE4qcK6jZQrCFj3QJ5CxPx-2Bya-2BBtuhi4trOVemFaYV5009sO27x4jVxHC7Cvi98rarf9zBCNfrZqNy48-2FJtPC9tFJbbOCeA8f1o1YqFZb0E7ortvU02K-2BNLNlYR0jyHAI91tBn9PtRWUQ2Z2&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw1q9Xo3QF2EllpWy3dEWPEI"><img alt="Biểu tượng Facebook" src="https://ci3.googleusercontent.com/meips/ADKq_NZ8eWjjrcRIzSf97IShBwkN3hf6EAG7mwr6W_kVv5mlf6jXuaDyCZR-ZHxmIxbRCPnfGib4i13UY0rRnesmU-MdcGrTM2eq65bfR-TVMbW9BRZ42k4MYcppnxxUQcVyOuitL-E=s0-d-e1-ft#https://lolstatic-a.akamaihd.net/email-marketing/betabuddies/facebook-logo.png" style="border:0;line-height:100%;outline:none;text-decoration:none;width:44px;height:44px" width="44" height="44" class="CToWUd" data-bit="iit"></a>
            </td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:24px;height:44px;border-collapse:collapse;font-family:inherit" width="24" height="44"></td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:44px;height:44px;border-collapse:collapse;font-family:inherit" width="44" height="44">
              <a href="https://links.riotgames.com/ls/click?upn=frHghcUMWgUZ9OUHJJkDdT7aY3UCbhQ284qVxRtKDyEQD4lAZTERRD3c6XEu5TXJtlsK_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nCQj3VYi-2FcfT0L4-2F-2BOSwU2TKuvXIxGBPltMKzV4CUSvlMqj-2BvGp81EBJOk4k5dh53VEsI9qEK78QQV27gd109vqQASXpTdjNzN-2BFFyJQvVzLGHaYtk5AoYFTLVLgxqZIaLh2wSrw2xFWm3L5IJHuY1i" style="color:#bd2225;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://links.riotgames.com/ls/click?upn%3DfrHghcUMWgUZ9OUHJJkDdT7aY3UCbhQ284qVxRtKDyEQD4lAZTERRD3c6XEu5TXJtlsK_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nCQj3VYi-2FcfT0L4-2F-2BOSwU2TKuvXIxGBPltMKzV4CUSvlMqj-2BvGp81EBJOk4k5dh53VEsI9qEK78QQV27gd109vqQASXpTdjNzN-2BFFyJQvVzLGHaYtk5AoYFTLVLgxqZIaLh2wSrw2xFWm3L5IJHuY1i&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw1qYqnFkOJB4w3F8135iWPN"><img alt="Biểu tượng Instagram" src="https://ci3.googleusercontent.com/meips/ADKq_NZUedGKkwdQ9Jw0Y6ClifA4PDpAMyAW1-N0oAWzeWOkcqJmIjw5BHdJOBiVWHCOjj3duW-y3unrjqfIcT4-q92i1dDv5ljZKhjocQMimNWs1PnpumPVQ64k3JBtOtYDCrYTJFUV=s0-d-e1-ft#https://lolstatic-a.akamaihd.net/email-marketing/betabuddies/instagram-logo.png" style="border:0;line-height:100%;outline:none;text-decoration:none;width:44px;height:44px" width="44" height="44" class="CToWUd" data-bit="iit"></a>
            </td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:24px;height:44px;border-collapse:collapse;font-family:inherit" width="24" height="44"></td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:44px;height:44px;border-collapse:collapse;font-family:inherit" width="44" height="44">
              <a href="https://links.riotgames.com/ls/click?upn=frHghcUMWgUZ9OUHJJkDdeW1wDDOuxHE5MPT4mYfE7LQgeoHdPW4raJsTvJ-2BirholGlzrNeODBkJCOou-2BUDx9hTChFApupqXGjq8Dt4dgEQ-3Dotuq_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nDUNrkYzL1-2BhrdbLFRTFI6hOHAIfLRP38-2F8aeJ63EQnILR8N46QxyBaTvg5-2BvqHbU79IuVCaGRddy0cVJ5Qbe7JR1e-2BCpwdAZZfuAphICFTCC-2FqdJ3yAmS4EpWWbLZPjTLLmBoLKgtqrtLi0B115bGN" style="color:#bd2225;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://links.riotgames.com/ls/click?upn%3DfrHghcUMWgUZ9OUHJJkDdeW1wDDOuxHE5MPT4mYfE7LQgeoHdPW4raJsTvJ-2BirholGlzrNeODBkJCOou-2BUDx9hTChFApupqXGjq8Dt4dgEQ-3Dotuq_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nDUNrkYzL1-2BhrdbLFRTFI6hOHAIfLRP38-2F8aeJ63EQnILR8N46QxyBaTvg5-2BvqHbU79IuVCaGRddy0cVJ5Qbe7JR1e-2BCpwdAZZfuAphICFTCC-2FqdJ3yAmS4EpWWbLZPjTLLmBoLKgtqrtLi0B115bGN&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw2gTqrGYKqvXhGuYmeXFNDP"><img alt="Biểu tượng YouTube" src="https://ci3.googleusercontent.com/meips/ADKq_Nbw5BguhKUzXGTPLZsJY9xNhnoGbwqSlFVubmXT-KvYiKA_WihAcokPFB5Ea-02DzZ_OjV7HO2EHFEA2itA_070a13moZT1eOK5cYTzdDH_qKykKVqjbfSSYG95ToiTmZ7qNw=s0-d-e1-ft#https://lolstatic-a.akamaihd.net/email-marketing/betabuddies/youtube-logo.png" style="border:0;line-height:100%;outline:none;text-decoration:none;width:44px;height:44px" width="44" height="44" class="CToWUd" data-bit="iit"></a>
            </td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:24px;height:44px;border-collapse:collapse;font-family:inherit" width="24" height="44"></td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;width:44px;height:44px;border-collapse:collapse;font-family:inherit" width="44" height="44">
              <a href="https://links.riotgames.com/ls/click?upn=frHghcUMWgUZ9OUHJJkDdbqsMaQEffE515rbAEvTn6-2FzdHhPZTEoVRxDYQu4rE9SNhx1_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nDmNtpa3vygr8POyamWsgryQmcuR1iaqigWr5jfIXF2AJGUsEvn6A0cttUBHgRS-2F8HIreOY2nxMpN4XEVWebGn1sbrDOQbhkqPNkFpaX7USSJYSps-2Bss-2BuEgPpW67rAis-2BxaKt5hNSH8R2A5dSy-2FkY2" style="color:#bd2225;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://links.riotgames.com/ls/click?upn%3DfrHghcUMWgUZ9OUHJJkDdbqsMaQEffE515rbAEvTn6-2FzdHhPZTEoVRxDYQu4rE9SNhx1_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nDmNtpa3vygr8POyamWsgryQmcuR1iaqigWr5jfIXF2AJGUsEvn6A0cttUBHgRS-2F8HIreOY2nxMpN4XEVWebGn1sbrDOQbhkqPNkFpaX7USSJYSps-2Bss-2BuEgPpW67rAis-2BxaKt5hNSH8R2A5dSy-2FkY2&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw0s3pD7-tnR-Gh4aJiDlVdw"><img alt="Biểu tượng Twitter" src="https://ci3.googleusercontent.com/meips/ADKq_NYDPpMKFfKpK07U8PBz_ZZkCa3lxfy-wSHkgBALHkWzEbaBXgiPGCHsLabi4OzA0cewt01ygRh-io4GT0MpbRvRm41I5P4K8O3m5S_RIKGMuPVvPsxsHKqoeXY-cyl8K3yfLQ=s0-d-e1-ft#https://lolstatic-a.akamaihd.net/email-marketing/betabuddies/twitter-logo.png" style="border:0;line-height:100%;outline:none;text-decoration:none;width:44px;height:44px" width="44" height="44" class="CToWUd" data-bit="iit"></a>
            </td>
            <td style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
    <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:32px;border-collapse:collapse;font-family:inherit" height="32">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
    </td>
  </tr>
</tbody>
</table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
<table cellpadding="0" cellspacing="0" style="padding:0;border:none;border-spacing:0;width:100%;margin:0 auto;border-collapse:collapse" width="100%">
<tbody>
  <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
    <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <span style="display:inline;vertical-align:middle;font-weight:800;font-size:12.64px;letter-spacing:0.08em;white-space:nowrap;font-family:inherit"><a href="https://links.riotgames.com/ls/click?upn=frHghcUMWgUZ9OUHJJkDdaslin-2FqpxTNhpsWvP-2FdJrIzmy3Vb9wkwL7FAp39O-2FpyV3KcJTlQXFtw4C6etxvOOw-3D-3D26nm_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nAciCVmzG6E3raxlwDpbno-2BvVxR8aAKmLJw1QbdUIW2CsMQUfkv7N0xZ93ULkmyhd3BVc91YrnDTL-2BawAFpnURECUOhyZsIlKDuhH2M62JCfQ-2BOh3f73azjC-2FK-2FuxFgXHdwGh8pQ78GiCWVtrkZV5-2Fd" style="text-decoration:none;text-transform:uppercase;color:#999;vertical-align:middle" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://links.riotgames.com/ls/click?upn%3DfrHghcUMWgUZ9OUHJJkDdaslin-2FqpxTNhpsWvP-2FdJrIzmy3Vb9wkwL7FAp39O-2FpyV3KcJTlQXFtw4C6etxvOOw-3D-3D26nm_1xc3-2FSi0PAe-2BDoeCILbWSfff20LGubT-2FF5hiBCSJSNzkYsWn3piJbctht-2Beeu2MX6otsvr33m6X-2FF8-2B-2BjOoMHS2Rj6ThNhgmmKNIpWvWtu7MCoknDHBvsma4av-2BQm8PZd1aqnuE9BYockrl6-2FTn8R7HSXbbVco0v4Wg914mET7MO9L-2F8LwbRjhkRhbyIlrYRiINd2eB-2B6FiTWLceoGiUMT4thqL8Na-2BgXFB-2FZTrdeJZjqjv-2BLwiL7OmzRr10MPvObr-2Br1Oupdat1qMZZgGwW-2BPwlog6T-2FFF4z-2FuEpxu-2F0pIUq8Dc3c7OB3nue-2FiUJc-2FAZv9WFaBOCIO7eAMpYObRKcrL-2Bjlhh0jM3NU-2Blh2YVC79GzuTbigRa590agHiRDBBNSfT5paeS6gVEdQXC00sDqoNSklWmdgP0XEmxK68-2BYfWSC8cXNY17WprSqFzuX-2B1JMBc7jrNglusegPmbCMZMgMqqTxdSuxDCFNwW2K0FpQNZ4FElPONvErUvbm1HRNjF0-2FcmWNJXvJaCeE3KNw4M0V41-2FEUBzs-2BOgiGvDOGhwr1JrW18sR6Y-2BRIZwVXOBa5eXPclViHWSeljTdAuSzsfUYin9PyJBBMEZsECGrXFNxv37DMlSE9f3WDzb2-2BL5MaJe31GmBjj2rTLvzTr3Qwu9ptjevaVxqw9NKPWi2r-2B2unyfbk4WxJFO1DebGXAMKFy9RFZ4BI1qZcl5SUvXcS2rBYFMKIRyC1vT04aw-2F9-2Bpm86-2F-2B4Kd5soc0sKocn32-2FkGl1T1pmDIgE7nzGJASD-2BZuGqT4QJV4XHJAFGt7n0V55Oum8-2BKHenN07xmDTS0rfmLpqdP7MXkaNL4JeCWR1nLclXTXJ32pf8D1u4ghWW7nAciCVmzG6E3raxlwDpbno-2BvVxR8aAKmLJw1QbdUIW2CsMQUfkv7N0xZ93ULkmyhd3BVc91YrnDTL-2BawAFpnURECUOhyZsIlKDuhH2M62JCfQ-2BOh3f73azjC-2FK-2FuxFgXHdwGh8pQ78GiCWVtrkZV5-2Fd&amp;source=gmail&amp;ust=1704982078314000&amp;usg=AOvVaw2ulPeOxOI7AWcfCF2ZplEb"><span style="display:inline;vertical-align:middle;font-weight:800;font-size:12.64px;letter-spacing:0.08em;white-space:nowrap;font-family:inherit"><img src="https://ci3.googleusercontent.com/meips/ADKq_NbM3Nyr77fPOiupqmiHDcc6ktxhIgsg0vznSDjfXk9IIZX3_DDLzI3WZHRBdbBY_YnLXAQm_LpTNGW_UJsOMfHLlHTvEtduHIu0A09Hna5b584BoHzW420iY5MMnKbtwAm1U37j1DmJnTT_66ldmILXpc1CII44z0RTyUrdEbb0QOBtZg=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/e457af8c-5531-4df1-a265-127217b6d80a/8x8.png" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none;width:4px;vertical-align:middle;margin:4px 16px" width="4" class="CToWUd" data-bit="iit"><span style="display:inline;vertical-align:middle;font-weight:800;font-size:12.64px;letter-spacing:0.08em;white-space:nowrap;font-family:inherit"><img src="https://ci3.googleusercontent.com/meips/ADKq_NbM3Nyr77fPOiupqmiHDcc6ktxhIgsg0vznSDjfXk9IIZX3_DDLzI3WZHRBdbBY_YnLXAQm_LpTNGW_UJsOMfHLlHTvEtduHIu0A09Hna5b584BoHzW420iY5MMnKbtwAm1U37j1DmJnTT_66ldmILXpc1CII44z0RTyUrdEbb0QOBtZg=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/e457af8c-5531-4df1-a265-127217b6d80a/8x8.png" style="border:0;height:auto;line-height:100%;outline:none;text-decoration:none;width:4px;vertical-align:middle;margin:4px 16px" width="4" class="CToWUd" data-bit="iit">
    </span></span></a></span></td>
  </tr>
  <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
    <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:16px;border-collapse:collapse;font-family:inherit" height="16">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
    </td>
  </tr>
</tbody>
</table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
</tr><tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:16px;border-collapse:collapse;font-family:inherit" height="16">
<table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">

</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
<td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:16px;border-collapse:collapse;font-family:inherit" height="16">
<table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
</td>
</tr>
<tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">

</tr>
</tbody>
</table>
</td>
<td style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
<div style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><div class="yj6qo"></div><div class="adL">
</div></div><div class="adL">
</div>
</div>
`;
};
const itemTemplate = (img: string, name: string, price: string) => {
  return `                                    <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
  <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:80px;border-collapse:collapse;font-family:inherit" height="80">
    <div style="font-family:inherit">
      <img width="100%" src='${img}' />
    </div>
  </td>
  <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:80px;border-collapse:collapse;font-family:inherit" height="80">  
    <div style="font-family:inherit">
      <p>
        ${name}
      </p>
    </div>
  </td>
  <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:80px;border-collapse:collapse;font-family:inherit" height="80">  
    <div style="font-family:inherit">
      ${price}.00$
    </div>
  </td>
</tr>
`;
};

export const mailOrderDetail = (
  items: any[],
  link: string,
  order: IOrder,
  user: IAuthBase
) => {
  let item = "";
  const today = new Date();
  for (let i = 0; i < items.length; i++) {
    item =
      item +
      itemTemplate(items[i].imgY.url, items[i].productName, items[i].price);
  }
  return (
    header(user.userName, order._id, today) +
    item +
    footer(link, order.totalPrice)
  );
};
