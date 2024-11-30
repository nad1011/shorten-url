import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
// import OutputLinkBox from "@/components/features/shortenUrl/OutputLinkBox";
import useToast from "@/hooks/useToast";
import { createShortUrl } from "@/store/urlSlice";

const ShortenPage = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { items, loading } = useSelector((state) => state.url);
  const [url, setUrl] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const shortenedUrls = items.filter((item) => !item.qrCode);

  const schema = Yup.string().url("Invalid URL").required("URL is required");

  const handleCreateShortUrl = async (e) => {
    e.preventDefault();

    try {
      const isValid = await schema.validate(url);
      if (!isValid) return;

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
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">URL Shortener</h1>
        <p className="text-sm text-muted-foreground">
          Create short and memorable links
        </p>
      </div>
      {/* Create Short URL Form */}
      <form onSubmit={handleCreateShortUrl} className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a long URL to shorten"
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon name="Link" className="mr-2 h-4 w-4" />
            )}
            Shorten URL
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Example: https://www.google.com
        </p>
      </form>

      {/* URLs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shortenedUrls.map((item) => (
          <div
            key={item.shortId}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">Shortened URL</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedItem(item)}
                >
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/${item.shortId}`}
                  className="text-sm bg-muted"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleCopy(`${window.location.origin}/${item.shortId}`)
                  }
                >
                  <Icon name="Copy" size={16} />
                </Button>
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Accessed: {item.accessTimes} times</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {shortenedUrls.length === 0 && !loading && (
        <div className="text-center py-12">
          <Icon
            name="Link"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <p className="text-muted-foreground">
            No shortened URLs yet. Create one using the form above.
          </p>
        </div>
      )}

      {/* URL Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">URL Details</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItem(null)}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Original URL</div>
                <div className="text-sm text-muted-foreground break-all">
                  {selectedItem.originalUrl}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Short URL</div>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={`${window.location.origin}/${selectedItem.shortId}`}
                    className="bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleCopy(
                        `${window.location.origin}/${selectedItem.shortId}`
                      )
                    }
                  >
                    <Icon name="Copy" size={18} />
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Statistics</div>
                <div className="text-sm text-muted-foreground">
                  Accessed {selectedItem.accessTimes} times
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenPage;
