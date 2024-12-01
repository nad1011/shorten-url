import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Icon from "@/components/common/Icon";
import { urlService } from "@/services/api/urlApi";

const RedirectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const response = await urlService.get(id);
        console.log("response", response);
        if (response.originalUrl) {
          window.location.href = response.originalUrl;
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Redirect error:", error);
        navigate("/404");
      }
    };

    fetchAndRedirect();
  }, [id, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-primary-foreground z-100">
      <Icon name="Loader2" className="h-24 w-24 animate-spin text-primary" />
      <p className="mt-4 text-2xl font-semibold">Redirecting, please wait...</p>
    </div>
  );
};

export default RedirectPage;
