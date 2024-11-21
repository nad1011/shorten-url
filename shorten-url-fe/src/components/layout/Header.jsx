import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

const Header = () => {
  return (
    <nav className="border-b bg-background flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2">
        <Icon name="Link" size={24} />
        <h2 className="text-xl font-semibold text-foreground">
          <span className="text-primary">S</span>horten Link
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="default" size="default">
          Sign Up
        </Button>
        <Button variant="secondary" size="default">
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Header;
