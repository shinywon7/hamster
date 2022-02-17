import axios from "axios";
import $ from "jquery";

const SelfStudy = ({ userObj }) => {
  let normalday = document.getElementById("registration_seat");
  const onSubmit = async (event) => {
    console.log(event);
    let a = [];
    a.baseURI = "https://djs.weschool.kr";
    a = { ...a, ...event.target };
    event.target = a;
  };
  const onClick = () => {
    normalday = document.getElementById("registration_seat");
    //normalday.submit();
    window
      .open(
        "https://djs.weschool.kr/sph_manager/prep/registration.php?p_mode=save&chk_no=0&chk_mode=seat_apply&chk_fid=fid_60459a9a74e2e&chk_type=seat&chk_order_no=1&"
      )
      .focus();
  };
  return (
    <div className="button SSD">
      <form
        className="selflogin"
        method="post"
        action="https://djs.weschool.kr/sph_manager/prep/registration.php?p_mode=save&chk_no=0&chk_mode=seat_apply&chk_fid=fid_60459a9a74e2e&chk_type=seat&chk_order_no=1&"
        name="frmlogin"
        target="_blank"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="url" value="/" />
        <input name="UID" value="20211115" />
        <input name="PASSWD" value="20211115" />
        <input type="submit" value="로그인" />
      </form>
      {/* <input onClick={onClick} value="click"></input> */}
      <link
        href="https://djs.weschool.kr/sph_manager/prep/registration.php"
        rel="external"
        style={{ height: "100px" }}
      ></link>

      <form
        id="registration_seat"
        name="registration_seat"
        method="post"
        target="_blank"
        action="https://djs.weschool.kr/sph_manager/prep/registration.php"
      >
        <input type="hidden" id="p_mode" name="p_mode" />
        <input type="hidden" id="uid_str" name="uid_str" value="" />
        <input type="hidden" id="chk_uid" name="chk_uid" value="" />
        <input type="hidden" id="chk_no" name="chk_no" value="0" />
        <input type="hidden" id="chk_mode" name="chk_mode" value="seat_apply" />
        <input
          type="hidden"
          id="chk_fid"
          name="chk_fid"
          value="fid_60459a9a74e2e"
        />
        <input type="hidden" id="chk_type" name="chk_type" value="seat" />
        <input type="hidden" id="chk_order_no" name="chk_order_no" value="1" />
        <input type="hidden" id="page" name="page" value="" />
        <input type="hidden" id="s_group" name="s_group" value="" />
        <input type="hidden" id="s_column" name="s_column" value="" />
        <input type="hidden" id="s_key" name="s_key" value="" />
        <input type="hidden" id="chk_scroll" name="chk_scroll" value="0" />
        <table class="tbl_light" cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="20%" />
            <col width="60%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              <th>신청자</th>
              <td colspan="2">인형원(20211115)</td>
            </tr>
            <tr>
              <th>신청항목</th>
              <td colspan="2">[일신2층]1-1교실 (20명 정원) </td>
            </tr>
            <tr>
              <th>비 고</th>
              <td colspan="2">
                <input
                  type="text"
                  class="input_normal"
                  id="ext_note"
                  name="ext_note"
                  value=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SelfStudy;
