import DimLayer from "@/components/common/DimLayer";
import useAuth from "@/hooks/useAuth";

const BaseForm = ({ ...props }) => {
  const { closeModal } = useAuth();

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <DimLayer onClickOutside={handleOutsideClick} />
      <form
        className="
          w-5/6 sm:w-3/5 md:w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          rounded-xl bg-primary-foreground py-5 px-10 flex flex-col items-center gap-6 z-20"
        onClick={(e) => e.stopPropagation()}
        {...props}
      ></form>
    </div>
  );
};

export default BaseForm;
