// แทบล่างสุดที่มี ปุ่มย้อนกลับ และถัดไป เป็น components ที่ใช้หลายหน้า
import image from "../../assets/CustomerPhoto/imageIndex.js";
import PropTypes from "prop-types";
import { buttonStyles } from "@/lib/ui-classes.js";
function SubmitTab(props) {
  return (
    <footer className="fixed bottom-0 z-40 flex min-h-[76px] w-full items-center justify-between gap-3 border-t border-grey300 bg-white px-4 py-3 sm:min-h-[92px] sm:px-8 lg:px-[10vw]">
      <button className={buttonStyles.secondary} onClick={props.onClickBack}>
        <img src={image.arrowBlue} className="inline " /> ย้อนกลับ{" "}
      </button>
      <button className={buttonStyles.primary} onClick={props.onClickNext}>
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
