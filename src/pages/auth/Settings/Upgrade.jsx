import { message as antMessage, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { API_ROOT } from "../../../utils/constants";
import axios from "axios";
import { fetchPremiumPlansAPI } from "../../../api/premiumPlan";
import { CheckCircleOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useWorkspaceStore } from "../../../store/workspaceStore";

const Upgrade = () => {
  const [plans, setPlans] = useState([]);
  const selectedWorkspaceId = useWorkspaceStore((state) => state.selectedWorkspaceId); //selectedWorkspaceId
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Người dùng chưa đăng nhập!");

    const decoded = jwtDecode(token);
    return decoded.userId;
}


  useEffect(() => {
    const fetchPremiumPlans = async () => {
      try {
        const response = await fetchPremiumPlansAPI();
        if (!response) throw new Error("Failed to fetch plans");

        const fetchedPlans = response.map((plan) => ({
          planId: plan.planId,
          name: plan.planName,
          price: `${new Intl.NumberFormat("vi-VN", {
            style: "decimal",
          }).format(plan.price)} VNĐ`,
          period: `per Workspace / ${plan.duration} days`,
          buttonText: "Upgrade",
          buttonType: "black",
          features: plan.description
            ? plan.description.split(",").map((text) => ({ text: text.trim() }))
            : [],
          isPopular: plan.isPopular,
        }));

        setPlans(fetchedPlans);
      } catch (error) {
        antMessage.error("Error fetching premium plans");
        console.error("Fetch error:", error);
      }
    };

    fetchPremiumPlans();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const success = query.get("success");
    const canceled = query.get("canceled");
    const orderCode = query.get("orderCode");
    const userId = getUserId();


    if (success && orderCode) {
        axios.post(`${API_ROOT}/api/payment/update-payment-status`, { orderCode, status: "success", userId, workspaceId: selectedWorkspaceId })
            .then(() => {
                setCheckoutMessage("Thanh toán thành công. Cảm ơn bạn!");
                setIsModalVisible(true);
            })
            .catch(error => console.error("Error updating payment:", error));
    }

    if (canceled) {
        setCheckoutMessage("Thanh toán thất bại. Vui lòng thử lại.");
        setIsModalVisible(true);
    }

    // ✅ Remove query parameters from URL after detecting them (prevents reload issue)
    window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
  }, []);

  const handleGetPaymentLink = async (planId) => {
    try {
      const response = await axios.post(
        `${API_ROOT}/api/payment/create-payment-link`,
        { planId , userId: getUserId(), workspaceId : selectedWorkspaceId }
      );
  
      const data = response.data;
  
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect manually
      } else {
        throw new Error("Invalid payment URL received");
      }
    } catch (error) {
      console.error("Payment link error:", error.response?.data || error.message);
      antMessage.error("Error creating payment link. Please try again.");
    }
  };
  

  const faqs = [
    {
      question: "What happens when my Premium plan expires?",
      answer:
        "When your Premium plan expires, your workspace will revert to the Free plan, and premium features will be disabled until you renew.",
    },
    {
      question: "Can I upgrade only my account instead of the whole workspace?",
      answer:
        "No, upgrading to Premium applies to the entire workspace, unlocking benefits for all members.",
    },
    {
      question: "How can I renew my subscription?",
      answer:
        "You will receive a renewal notification before your subscription expires. You can renew via Workspace Settings under the 'Upgrade' section.",
    },
    {
      question: "Will I lose my data if I downgrade?",
      answer:
        "No, your data will remain intact. However, features tied to the Premium plan will be locked until you upgrade again.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Success/Failure Modal */}
      <CheckoutMessage
        message={checkoutMessage}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Upgrade Your Workspace</h1>
          <p className="text-gray-600">
            Unlock powerful features and remove limitations to enhance your
            team's productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.planId}
              className={`relative rounded-xl border p-6 ${
                plan.isPopular
                  ? "border-purple-200 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm">
                    ⭐ Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleGetPaymentLink(plan.planId)}
                  className={`w-full py-2 px-4 rounded-xl ${
                    plan.isPopular
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                  } transition-colors`}
                >
                  Upgrade
                </button>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutMessage = ({ message, visible, onClose }) => {
  return (
    <Modal
      title={null} // Ẩn tiêu đề
      open={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="back"
          type="primary"
          size="large"
          onClick={onClose}
          className="w-full mt-8"
        >
          Trờ về trang thanh toán
        </Button>,
      ]}
      centered
    >
      <div className="text-center mt-8">
        <CheckCircleOutlined style={{ fontSize: "80px", color: "#52c41a" }} />
        <h2 className="text-2xl font-semibold mt-4">Thanh toán thành công</h2>
        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </Modal>
  );
};

export default Upgrade;
