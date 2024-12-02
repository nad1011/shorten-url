import { useSelector } from "react-redux";

import Icon from "@/components/common/Icon";
import LoginPromptBox from "@/components/features/LoginPromtBox";

const AnalyticPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="mx-auto max-w-xl w-full flex flex-col gap-2 py-6">
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      {user ? (
        <div className="flex flex-col items-center gap-2">
          <Icon name="Smile" className="h-24 w-24 animate-spin text-primary" />
          <h2 className="text-xl">Haha, nothing here yet</h2>
        </div>
      ) : (
        <LoginPromptBox message="You need to be logged in to view our analytics" />
      )}
    </div>
  );
};

export default AnalyticPage;
