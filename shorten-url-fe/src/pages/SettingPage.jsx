import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoginPromptBox from "@/components/features/LoginPromtBox";
import { logOut } from "@/store/authSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const SettingsPage = () => {
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || "",
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-xl w-full flex flex-col gap-2 py-6">
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {user ? (
        <div className="rounded-lg border bg-card p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-2">
            <Avatar src={user?.src} alt={user?.username} size="xl" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <Button onClick={handleAvatarClick} variant="link">
              Change Avatar
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email (Read-only) */}
            <Input value={user?.email} label="Email" disabled />

            {/* Username */}
            <Input label="Username" {...register("username")} />

            {/* Password Change */}
            <div className="space-y-6">
              <Input
                type="password"
                label="Current Password"
                {...register("currentPassword")}
                error={errors.currentPassword?.message}
              />
              <Input
                type="password"
                label="New Password"
                {...register("newPassword")}
                error={errors.newPassword?.message}
              />
              <Input
                type="password"
                label="Confirm Password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" onClick={() => dispatch(logOut())}>
                Log Out
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      ) : (
        <LoginPromptBox message="You need to be logged in to view and change settings" />
      )}
    </div>
  );
};

export default SettingsPage;
