import { useState, useEffect } from "react";
import { Modal, Input, Button, Space, message } from "antd";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { handleVerifyOTP, resendOtpAPI } from "../../api/Admin";

export default function OTPVerification({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30); // ⏳ Timer for resend
  const navigate = useNavigate();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setError(null);
      setIsSuccess(false);
      setResendDisabled(false);
      setCountdown(30);
    }
  }, [isOpen]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, countdown]);

  // Handle input change
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "").slice(0, 1);

    if (value && index < 5) {
      document.querySelector(`input[data-index="${index + 1}"]`)?.focus();
    }

    setOtp(newOtp);
  };

  // Handle backspace and enter key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.querySelector(`input[data-index="${index - 1}"]`)?.focus();
    }
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Verify OTP
  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await handleVerify(email, otpString);
      setIsSuccess(true);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      setResendDisabled(true);
      setCountdown(30);
      await resendOtp(email);
    } catch (error) {
      setError("Failed to resend OTP. Try again later.", error);
      setResendDisabled(false);
    }
  };

  const handleVerify = async (email, otp) => {
    try {
      await handleVerifyOTP(email, otp);
      message.success("OTP verification successful!");
    } catch (error) {
      message.error(error || "OTP verification failed!");
      throw error;
    }
  };

  const resendOtp = async (email) => {
    try {
      const response = resendOtpAPI(email);
      message.success(`✅ OTP Resent: ${response.message}`);
      return response;
    }  catch (error) {
      message.error(error || "❌ Failed to resend OTP!");
      console.error("❌ Error Resending OTP:", error);
      throw error;
    }
  };

  return (
    <Modal
      title="Enter Verification Code"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <div className="flex flex-col items-center space-y-6 py-4">
        <p className="text-gray-500 text-sm text-center">
          Please enter the 6-digit code sent to <b>{email}</b>
        </p>

        {/* OTP Inputs */}
        <Space size={8}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              data-index={index}
              className="w-12 h-12 text-center text-lg"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </Space>

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <XCircleIcon className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}

        {/* Verify Button */}
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={otp.join("").length !== 6 || isLoading}
          className={`w-full h-10 ${
            isSuccess ? "bg-green-500 hover:bg-green-600" : ""
          }`}
          icon={isSuccess && <CheckCircleIcon className="w-5 h-5 mr-1" />}
        >
          {isLoading ? "Verifying..." : isSuccess ? "Verified!" : "Verify Code"}
        </Button>

        {/* Resend OTP */}
        <button
          onClick={handleResend}
          className="text-blue-500 text-sm hover:underline"
          disabled={resendDisabled}
        >
          {resendDisabled
            ? `Resend OTP in ${countdown}s`
            : "Didn't receive the code? Resend"}
        </button>
      </div>
    </Modal>
  );
}
