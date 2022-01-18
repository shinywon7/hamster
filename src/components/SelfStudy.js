const SelfStudy = ({ userObj }) => {
  const onClick = () => {
    // const driver = new WebDriver.Builder().forBrowser("Chrome").build();
    // Instantiate a web browser page
    // driver.navigate().to("google");
  };
  return (
    <div onClick={onClick} className="button SSD">
      <form
        target="_blank"
        id="registration_seat"
        name="registration_seat"
        method="post"
        action="https://djs.weschool.kr/sph_manager/weekend/index.php"
      >
        <input type="submit" />
        {/* <input type="hidden" id="uid" name="UID" value="20211115" />
        <input type="hidden" id="password" name="password" value="20211115" /> */}
        <input type="hidden" id="p_mode" name="p_mode" value="save" />
        <input type="hidden" id="kind" name="kind" value="saturday" />
        <input type="hidden" id="uid_str" name="uid_str" value="20211115" />
        <input type="hidden" id="chk_uid" name="chk_uid" value="20211115" />
        <input type="hidden" id="chk_no" name="chk_no" value="2" />
        <input
          type="hidden"
          id="chk_mode"
          name="chk_mode"
          value="layer_seat_apply"
        />
        <input
          type="hidden"
          id="chk_fid"
          name="chk_fid"
          value="fid_5e55ec5cdd126"
        />
        <input type="hidden" id="chk_type" name="chk_type" value="seat" />
        <input type="hidden" id="chk_order_no" name="chk_order_no" value="1" />
        <input type="hidden" id="stamp" name="stamp" value="1642777200" />
        <input type="hidden" id="page" name="page" value="" />
        <input type="hidden" id="s_group" name="s_group" value="" />
        <input type="hidden" id="s_column" name="s_column" value="" />
        <input type="hidden" id="s_key" name="s_key" value="" />
        <input type="hidden" id="chk_scroll" name="chk_scroll" value="0" />
        <input type="hidden" id="chk_week" name="chk_week" value="1" />
        <input type="hidden" id="pid" name="pid" value="pid5ac33c177a2b8" />
      </form>
    </div>
  );
};

export default SelfStudy;
