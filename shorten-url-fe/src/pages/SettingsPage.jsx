import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FieldsContainer from "@/components/features/settingsPage/FieldsContainer";
import SettingField from "@/components/features/settingsPage/SettingField";

const SettingsPage = () => {
  return (
    <div className="md:w-4/5 lg:w-3/5 mx-auto">
      <FieldsContainer>
        <SettingField
          labelName="Avatar"
          description="Your display avatar"
          settingComponent={
            <div className="flex flex-col gap-4 w-24 ml-auto">
              {/* aspect-square is not working */}
              <Avatar className="w-full h-24" />
              <Button className="w-full" variant="secondary">
                Change
              </Button>
            </div>
          }
        />
        <SettingField
          labelName="Username"
          description="Your display name"
          settingComponent={
            <div className="flex gap-5">
              <Input
                className="w-full"
                readOnly
                disabled
                value="Margot Foster"
              />
              <Button className="flex-none w-24" variant="secondary">
                Change
              </Button>
            </div>
          }
        />
        <SettingField
          labelName="Password"
          description="Your secret password"
          settingComponent={
            <div className="flex gap-5">
              <Input
                className={"w-full"}
                readOnly
                disabled
                value={"**********"}
              />
              <Button className="flex-none w-24" variant="destructive">
                Change
              </Button>
            </div>
          }
        />
        <SettingField
          labelName="Email"
          description="Your fancy email"
          settingComponent={
            <Input
              className={"w-full"}
              readOnly
              disabled
              value={"MargotFoster@gmail.com"}
            />
          }
        />
      </FieldsContainer>
    </div>
  );
};

export default SettingsPage;
