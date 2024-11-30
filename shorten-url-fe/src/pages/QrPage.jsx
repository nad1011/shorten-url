import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import useToast from "@/hooks/useToast";
import { generateQrCode, fetchUrls } from "@/store/urlSlice";
import { validateUrl } from "@/utils";

const QrPage = () => {
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

  const generatedQr = items.filter((item) => item.qrCode).at(0);

  const handleCreateQR = async (e) => {
    e.preventDefault();

    setError("");
    const validationResult = await validateUrl(url);
    if (typeof validationResult === "string") {
      setError(validationResult);
      return;
    }

    try {
      await dispatch(generateQrCode(url)).unwrap();
      setUrl("");
      showToast("QR Code created successfully", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDownload = () => {
    if (!generatedQr) return;

    const svgContent = generatedQr.qrCode;
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
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCreateQR} className="space-y-4">
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="Enter a URL to generate QR code"
            error={error}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Generate QR Code"
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Example: https://www.google.com
          </p>
        </form>

        {/* Output Section */}
        {generatedQr && (
          <div className="flex flex-col items-center space-y-4 pt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Your QR Code
            </h2>

            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div
                dangerouslySetInnerHTML={{ __html: generatedQr.qrCode }}
                style={{
                  width: "200px",
                  height: "200px",
                }}
                className="mx-auto"
              />
            </div>

            <Button
              variant="outline"
              onClick={handleDownload}
              className="h-11 px-6 rounded-xl flex items-center gap-2 border-2"
            >
              <Icon name="Download" size={18} />
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrPage;
