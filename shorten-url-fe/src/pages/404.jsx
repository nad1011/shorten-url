import { Link } from "react-router-dom";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

const ErrorPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-primary-foreground z-100">
      <Icon name="error" size="large" />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <Button className="mt-4">Go back to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
