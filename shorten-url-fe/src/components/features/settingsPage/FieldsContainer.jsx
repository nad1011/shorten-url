const FieldsContainer = ({ ...props }) => {
  return (
    <div className="mt-6 border-t">
      <dl className="divide-y divide-gray-400" {...props}></dl>
    </div>
  );
};

export default FieldsContainer;
