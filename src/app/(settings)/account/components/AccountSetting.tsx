import { Labels } from "@/components/ui/labels";
import React, { FC } from "react";

interface AccountSettingProps {
  handleResetPassword: () => void;
}

const AccountSetting: FC<AccountSettingProps> = ({
  handleResetPassword,
}) => {
  return (
    <Labels
      onClick={handleResetPassword}
      className="ml-3 cursor-pointer"
    >
      Account Settings
    </Labels>
  );
};

export default AccountSetting;
