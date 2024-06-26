import { Toaster } from "react-hot-toast";
import FormOtp from "./form";
import ToastListener from "@/components/ui/ToastListener";

export default function OtpPage() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastListener />
      <FormOtp />
    </>
  );
}
