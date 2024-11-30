import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

const LoginPromptBox = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4 text-center">
      <p className="text-sm text-muted-foreground">
        Sign in to save your shortened URLs and access them anytime
      </p>
      <Button variant="outline" className="mt-2">
        <Icon name="LogIn" className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </div>
  );
};

export default LoginPromptBox;
