import PropTypes from "prop-types";

const SettingField = ({ labelName, description, settingComponent }) => {
  return (
    <div className="flex px-6 py-3 gap-16">
      {/* Setting Header */}
      <div className="flex-auto w-96">
        <label className="text-sm font-medium">{labelName}</label>
        <p className="text-sm font-light">{description}</p>
      </div>

      {/* Setting Body */}
      <div className="w-full">{settingComponent}</div>
    </div>
  );
};

SettingField.propTypes = {
  labelName: PropTypes.string,
  description: PropTypes.string,
  settingComponent: PropTypes.element,
};

export default SettingField;
