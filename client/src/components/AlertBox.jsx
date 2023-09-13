import "../styles/App.css";
import image from "../assets/AdminPhoto/imageIndex";

function AlertBoxDelete(props) {
  return (
    <div className="h-screen z-[99] w-screen fixed flex items-center justify-center top-0 left-0 ">
      <div
        id="popUp"
        className="h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div
          className="w-fit h-fit
    rounded-2xl shadow-2xl m-5 z-30 absolute bg-white flex items-center justify-center"
        >
          <div className="w-fit h-fit p-10 flex flex-col justify-between items-center">
            <div
              className="w-fit h-36 py-1.5 texts-icon flex flex-col
         items-center justify-between"
            >
              <img
                alt="Delete Icon"
                className="w-7 h7"
                src={image.exclamation}
              />
              <div className="font-medium text-xl text-center">{props.textAlert}</div>
              <div className="h-12 text-grey700 font-light text-base">
                <div className="leading-6 text-center">
                  {props.alertQuestion}
                </div>
              </div>
            </div>
            <div className="flex w-[20vw] self-center justify-evenly">
              <button className="btn-primary" onClick={props.deleteFunction}>
                {props.primary}
              </button>
              <button className="btn-secondary" onClick={props.hideFunction}>
                {props.secondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertBoxDelete;