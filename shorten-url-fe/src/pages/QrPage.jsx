import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import useToast from "@/hooks/useToast";
import { generateQrCode } from "@/store/urlSlice";

const QrPage = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { items, loading } = useSelector((state) => state.url);
  const [url, setUrl] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const qrItems = items.filter((item) => item.qrCode);

  console.log("QR Items", items);

  const handleCreateQR = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      await dispatch(generateQrCode(url)).unwrap();
      setUrl("");
      showToast("QR Code created successfully", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDownload = (item) => {
    const svgContent = item.qrCode;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${item.shortId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-sm text-muted-foreground">
          Create QR codes with shortened URLs
        </p>
      </div>

      {/* Create QR Form */}
      <form onSubmit={handleCreateQR} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to generate QR code"
            className="flex-1 rounded-md border border-input bg-background px-4 py-2"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon name="QrCode" className="mr-2 h-4 w-4" />
            )}
            Generate QR
          </Button>
        </div>
      </form>

      {/* QR Codes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {qrItems.map((item) => (
          <div
            key={item.shortId}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="space-y-4">
              {/* QR Preview */}
              <div className="flex justify-center p-4 bg-white rounded-md">
                <div
                  dangerouslySetInnerHTML={{ __html: item.qrCode }}
                  className="w-32 h-32"
                />
              </div>

              {/* URL Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Short URL</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedItem(item)}
                  >
                    <Icon name="ExternalLink" size={16} />
                  </Button>
                </div>
                <code className="block text-sm bg-muted p-2 rounded">
                  {`${window.location.origin}/${item.shortId}`}
                </code>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Accessed: {item.accessTimes} times
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(item)}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {qrItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <Icon
            name="QrCode"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <p className="text-muted-foreground">
            No QR codes yet. Generate one using the form above.
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
                  <input
                    type="text"
                    value={`${window.location.origin}/${selectedItem.shortId}`}
                    readOnly
                    className="flex-1 rounded-md border border-input bg-muted px-3 py-2 text-sm"
                  />
                  <Button variant="outline" size="icon">
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

export default QrPage;
