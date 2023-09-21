function Title(props) {
    return (
        <div className="flex justify-center items-center p-6 sticky top-0 z-[100] bg-blue600">
            <h1 className="text-[32px] text-white font-medium">{props.title}</h1>
        </div>
    );
}
  export default Title;