import React from "react"

class Upgrade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      billingPeriod: "monthly",
    }
  }

  plans = [
    {
      name: "Free",
      price: "0",
      popular: false,
      features: [
        "Basic workspace management",
        "Limited to 5 members",
        "Basic task management",
        "Standard support",
      ],
      cta: "Current Plan",
    },
    {
      name: "Business",
      price: 7,
      popular: true,
      features: [
        "All Free plan features",
        "Access to workspace statistics",
        "Team performance charts",
        "Increased task automation",
        "Priority support",
      ],
      cta: "Upgrade",
    },
    {
      name: "Business Plus",
      price: 10,
      popular: false,
      features: [
        "All Business plan features",
        "No member limit in workspace",
        "Advanced analytics & reports",
        "Workspace audit logs",
        "24/7 Premium Support",
      ],
      cta: "Upgrade",
    },
  ]

  faqs = [
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
  ]

  render() {
    return (
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold">Upgrade Your Workspace</h1>
            <p className="text-gray-600">
              Unlock powerful features and remove limitations to enhance your team's productivity.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {this.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-6 ${
                  plan.popular ? "border-purple-200 shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 ml-1">per Workspace / month</span>
                      </div>
                    ) : (
                      <div className="text-lg">Custom pricing</div>
                    )}
                  </div>
                  <button
                    className={`w-full py-2 px-4 rounded-md ${
                      plan.popular
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                    } transition-colors`}
                  >
                    {plan.cta}
                  </button>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {this.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Upgrade
