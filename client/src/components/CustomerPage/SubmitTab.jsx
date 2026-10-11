// แทบล่างสุดที่มี ปุ่มย้อนกลับ และถัดไป เป็น components ที่ใช้หลายหน้า
import image from "../../assets/CustomerPhoto/imageIndex.js";
import PropTypes from "prop-types";
function SubmitTab(props) {
  return (
    <footer className="w-full flex justify-between items-center bg-white h-[92px] px-[10vw] border-t border-grey300 fixed bottom-0 ">
      <button className="btn-secondary " onClick={props.onClickBack}>
        <img src={image.arrowBlue} className="inline " /> ย้อนกลับ{" "}
      </button>
      <button className="btn-primary " onClick={props.onClickNext}>
        {" "}
        {props.next}
        <img src={image.arrowWhite} className="inline" />
      </button>
    </footer>
  );
}

SubmitTab.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  next: PropTypes.node.isRequired,
};

export default SubmitTab;
