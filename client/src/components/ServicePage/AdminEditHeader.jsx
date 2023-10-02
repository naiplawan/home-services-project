import image from "../../assets/AdminPhoto/imageIndex";

function AdminEditedHeader(props) {
  return (
    <header className="h-20 w-full flex items-center justify-between border-b border-grey300 px-10 py-10 bg-white">
      <div className="flex gap-[14px] h-12 w-fit">
        
        <button onClick={props.back}>
          <img alt="Arrow Icon" src={image.arrow} className="w-10 h10" />
        </button>
        <h1></h1>
        <div className="w-52 h-12">
          <div className="font-normal text-grey700 text-xs">{props.title}</div>
          <div className="font-medium text-xl">{props.name}</div>
        </div>
      </div>
      <div className="buttons flex justify-between h-11 w-64 px-1">
        {props.children}
      </div>
    </header>
  );
}

export default AdminEditedHeader;
