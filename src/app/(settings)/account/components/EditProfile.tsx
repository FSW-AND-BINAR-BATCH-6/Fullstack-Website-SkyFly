import { Labels } from "@/components/ui/labels";
import React, { FC } from "react";

interface EditProfileProps {
  setIsEdit: (value: boolean) => void;
  handleEditProfile: () => void;
}

const EditProfile: FC<EditProfileProps> = ({
  setIsEdit,
  handleEditProfile,
}) => {
  const handleClick = () => {
    setIsEdit(true);
    handleEditProfile();
  };

  return (
    <Labels onClick={handleClick} className="ml-3 cursor-pointer">
      Edit Profile
    </Labels>
  );
};

export default EditProfile;
