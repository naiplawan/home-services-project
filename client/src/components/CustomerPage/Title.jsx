import PropTypes from "prop-types";

function Title(props) {
    return (
        <div className="flex justify-center items-center p-6 bg-blue600">
            <h1 className="text-2xl text-white font-medium">{props.title}</h1>
        </div>
    );
}

Title.propTypes = { title: PropTypes.string.isRequired };
  export default Title;
