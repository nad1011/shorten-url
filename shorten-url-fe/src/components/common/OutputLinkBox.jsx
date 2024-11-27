import PropTypes from "prop-types";

const OutputLinkBox = ({ shortenedLink }) => {
  return (
    <div>
      <h1 className="font-medium text-lg mb-3">Shortened URL</h1>
      <div className="text-sm rounded-xl bg-secondary p-4">
        <a className="hover:text-primary hover:underline" href={shortenedLink}>
          {shortenedLink}
        </a>
      </div>
    </div>
  );
};

OutputLinkBox.propTypes = {
  shortenedLink: PropTypes.string,
};

export default OutputLinkBox;
