import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import OutputLinkBox from "@/components/common/OutputLinkBox";

const ShortenPage = () => {
  const placeHolderText = "Enter a long URL to shorten";

  return (
    <div className="sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto flex flex-col gap-7 mt-8">
      <h1 className="text-center text-4xl font-medium">URL Shortener</h1>
      <Input placeholder={placeHolderText} />
      <Button className="w-full">Shorten URL</Button>
      <p className="text-secondary text-sm">Example: https://www.goole.com</p>
      <OutputLinkBox />
    </div>
  );
};

export default ShortenPage;
