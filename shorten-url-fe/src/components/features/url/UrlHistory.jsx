import PropTypes from "prop-types";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import useToast from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const UrlHistory = ({ urls, type = "short" }) => {
  const showToast = useToast();

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!", "success");
    } catch (error) {
      showToast(error, "error");
    }
  };

  const handleDownload = (svgContent) => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-semibold tracking-tight">
        Your {type === "qr" ? "QR Codes" : "Shortened URLs"}
      </h2>

      <div className="relative">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6" style={{ minWidth: "min-content" }}>
            {urls.map((item) => (
              <div
                key={item.shortId}
                className={cn(
                  "rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow flex",
                  type === "qr" ? "w-[350px] gap-2" : "w-[300px]"
                )}
              >
                {type === "qr" && (
                  <div className="bg-primary-foreground rounded-md flex">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.qrCode }}
                      className="w-36 h-36"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "space-y-3 w-full",
                    type === "qr" && "w-[150px]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Original URL</span>
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.originalUrl}
                  </p>
                  {type === "short" && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Short URL</div>
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
                            handleCopy(
                              `${window.location.origin}/${item.shortId}`
                            )
                          }
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Accessed: {item.accessTimes} times</span>
                  </div>

                  {type === "qr" && (
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(item.qrCode)}
                    >
                      <Icon name="Download" size={18} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .overflow-x-auto {
            scrollbar-width: thin;
            scrollbar-color: rgb(203 213 225) transparent;
          }

          .overflow-x-auto::-webkit-scrollbar {
            height: 6px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background: transparent;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: rgb(203 213 225);
            border-radius: 20px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background-color: rgb(148 163 184);
          }
        `}</style>
      </div>

      {urls.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name={type === "qr" ? "QrCode" : "Link"}
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <p className="text-muted-foreground">
            No {type === "qr" ? "QR codes" : "shortened URLs"} yet.
          </p>
        </div>
      )}
    </div>
  );
};

UrlHistory.propTypes = {
  urls: PropTypes.array,
  type: PropTypes.oneOf(["short", "qr"]),
};

export default UrlHistory;
