import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import useAuth from "@/hooks/useAuth";

const LoginPromptBox = () => {
  const { openLoginModal } = useAuth();

  return (
    <div className="bg-muted/50 rounded-lg p-4 text-center w-full">
      <p className="text-sm text-muted-foreground">
        Sign in to save your shortened URLs and access them anytime
      </p>
      <Button variant="outline" className="mt-2" onClick={openLoginModal}>
        <Icon name="LogIn" className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </div>
  );
};

export default LoginPromptBox;
