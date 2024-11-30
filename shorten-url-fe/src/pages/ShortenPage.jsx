import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import LoginPromptBox from "@/components/features/LoginPromtBox";
import useToast from "@/hooks/useToast";
import { createShortUrl, fetchUrls } from "@/store/urlSlice";
import { validateUrl } from "@/utils";

const ShortenPage = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { items, loading } = useSelector((state) => state.url);
  const { user } = useSelector((state) => state.auth);

  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (user) {
        await dispatch(fetchUrls(user));
      }
    }
    fetchData();
  }, [user, dispatch]);

  const shortenedUrl = items.filter((item) => !item.qrCode).at(0);

  const outputUrl = shortenedUrl
    ? `${window.location.origin}/${shortenedUrl.shortId}`
    : "";

  const handleCreateShortUrl = async (e) => {
    e.preventDefault();

    setError("");
    const validationResult = await validateUrl(url);
    if (typeof validationResult === "string") {
      setError(validationResult);
      return;
    }

    try {
      await dispatch(createShortUrl(url)).unwrap();
      setUrl("");
      showToast("URL shortened successfully", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!", "success");
    } catch (error) {
      showToast("Failed to copy", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">URL Shortener</h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCreateShortUrl} className="space-y-4">
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="Enter a long URL to shorten"
            error={error}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Shorten URL"
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Example: https://www.google.com
          </p>
        </form>

        {/* Output Section */}
        {shortenedUrl && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Shortened URL</h2>
            <div className="flex gap-2">
              <Input readOnly value={outputUrl} className="flex-1 bg-muted" />
              <Button
                variant="outline"
                onClick={() => handleCopy(outputUrl)}
                className="px-4"
              >
                <Icon name="Copy" size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* Login Prompt */}
        {!user && shortenedUrl && <LoginPromptBox />}
      </div>
    </div>
  );
};

export default ShortenPage;
