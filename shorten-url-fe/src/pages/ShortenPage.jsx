import { useState } from "react";
import * as Yup from "yup";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import OutputLinkBox from "@/components/common/OutputLinkBox";

const ShortenPage = () => {
  const placeHolderText = "Enter a long URL to shorten";

  const [inputValue, setInputValue] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const inputValueIsURL = () => {
    const schema = Yup.string().required().url("Invalid URL");
    return schema.isValid(inputValue);
  };

  const handleShortenUrl = async () => {
    setShortUrl(null);

    const isInputValid = await inputValueIsURL();
    if (!isInputValid) return;

    // TODO: Replace your real endpoint here
    const endPoint = "/TestShortenLinkResponse.json";
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const jsonData = await response.json();
    setShortUrl(jsonData.shortenedLink);
  };

  return (
    <div className="sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto flex flex-col gap-7 mt-8">
      <h1 className="text-center text-4xl font-medium">URL Shortener</h1>
      <Input
        placeholder={placeHolderText}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <Button className="w-full" onClick={handleShortenUrl}>
        Shorten URL
      </Button>
      <p className="text-secondary text-sm">Example: https://www.goole.com</p>
      {shortUrl && <OutputLinkBox shortenedLink={shortUrl} />}
    </div>
  );
};

export default ShortenPage;
