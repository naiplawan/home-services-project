import image from "../../assets/AdminPhoto/imageIndex";
import PropTypes from "prop-types";

function AdminEditedHeader(props) {
  return (
    <header className="flex min-h-20 w-full items-center justify-between gap-3 border-b border-grey300 bg-white px-3 py-3 sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-2 sm:gap-[14px]">
        
        <button onClick={props.back}>
          <img alt="Arrow Icon" src={image.arrow} className="h-8 w-8 sm:h-10 sm:w-10" />
        </button>
        <h1></h1>
        <div className="min-w-0 sm:w-52">
          <div className="font-normal text-grey700 text-xs">{props.title}</div>
          <div className="truncate font-medium text-base sm:text-xl">{props.name}</div>
        </div>
      </div>
      <div className="buttons flex shrink-0 items-center gap-2 sm:h-11 sm:w-64 sm:justify-between sm:px-1">
        {props.children}
      </div>
    </header>
  );
}

AdminEditedHeader.propTypes = {
  back: PropTypes.func.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
};

export default AdminEditedHeader;
