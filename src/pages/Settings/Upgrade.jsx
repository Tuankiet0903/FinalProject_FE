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
      name: "Unlimited",
      price: 7,
      popular: false,
      features: [
        "All Free plan features",
        "Unlimited Storage",
        "Unlimited Spaces",
        "Unlimited Custom Fields",
        "Unlimited Gantt Charts",
        "Time Tracking",
        "AI compatible",
      ],
      cta: "Upgrade",
    },
    {
      name: "Business",
      price: 12,
      popular: true,
      features: [
        "All Unlimited plan features",
        "Unlimited Timeline Views",
        "Unlimited Workload Analysis",
        "Unlimited Teams",
        "Private Docs",
        "Timesheets",
        "Unlimited Dashboards with Advanced Widgets",
        "Google Single Sign-On (SSO)",
        "SMS 2-Factor Authentication",
        "AI compatible",
      ],
      cta: "Upgrade",
    },
    {
      name: "Business Plus",
      price: 19,
      popular: false,
      features: [
        "All Business plan features",
        "Priority Support",
        "Admin Training",
        "Custom Branded Forms",
        "Conditional Logic in Forms",
        "Add Subtasks to Unlimited Lists",
        "Custom Permissions (ACL)",
        "Team Sharing",
        "Advanced Capacity Planning",
        "Connected Search",
        "Higher API Limit",
        "AI compatible",
      ],
      cta: "Upgrade",
    },
    {
      name: "Enterprise",
      price: null,
      popular: false,
      features: [
        "All Business Plus plan features",
        "Customer Success Manager",
        "Team Onboarding Support",
        "White Labeling",
        "Microsoft, Okta and Custom SAML Single Sign-On (SSO)",
        "Advanced Security Controls",
        "Unlimited Custom Roles",
        "Workspace Connected Search",
        "Integration with Tableau",
        "Highest API Limit",
        "Access to Managed Services",
        "AI compatible",
      ],
      minimumSeats: 15,
      cta: "Contact Sales",
    },
  ]

  faqs = [
    {
      question: "We need to add new users to our Workspace. How will that be billed?",
      answer:
        "We'll make a one-time, prorated charge to your credit card to cover your new Workspace member's account for the remainder of the current billing period.",
    },
    {
      question: "Can I upgrade ClickUp just for myself, instead of upgrading everyone in our Workspace?",
      answer:
        "Unfortunately, no. ClickUp is built for Workspaces, and our paid Plans are doubly so. To upgrade ClickUp, you'll need to upgrade your entire Workspace.",
    },
    {
      question: "What happens if I change my mind?",
      answer:
        "We offer a 30-day satisfaction guarantee for all paid plans! A refund will be applied as long as your account doesn't reflect a prorated credit at any time during the billing cycle.",
    },
    {
      question: "My Workspace has credits. How do we use them?",
      answer:
        "Once your Workspace signs up for a paid Plan, we'll draw against your credit balance until it runs out. Only then will we start charging your subscription to your credit card.",
    },
  ]

  render() {
    return (
      <div className="min-h-screen bg-white">
        {/* AI Add-on Banner */}
        <div className="bg-purple-900 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-purple-200">Add AI to any ClickUp paid plan for just</span>
              <span className="font-semibold">$15 $7 per member per month</span>
            </div>
            <button className="bg-purple-600 px-4 py-1.5 rounded-md hover:bg-purple-700 transition-colors">
              Choose plan
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">Upgrade to unleash everything</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm text-green-700 bg-green-50">
                30 day money back guarantee
              </span>
            </div>
            <p className="text-gray-600">
              Your Workspace is currently on the Free Forever Plan. You have used 2.18/100 MB.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-4 py-2 rounded-md ${
                this.state.billingPeriod === "monthly" ? "bg-gray-100 text-gray-900" : "text-gray-500"
              }`}
              onClick={() => this.setState({ billingPeriod: "monthly" })}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                this.state.billingPeriod === "yearly" ? "bg-gray-100 text-gray-900" : "text-gray-500"
              }`}
              onClick={() => this.setState({ billingPeriod: "yearly" })}
            >
              Yearly
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                      ❤️ Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 ml-1">member / month</span>
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
                  {plan.minimumSeats && (
                    <div className="pt-4 text-sm text-gray-500">👥 Minimum {plan.minimumSeats} seats</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Compare Features Button */}
          <div className="text-center mb-16">
            <button className="text-gray-600 hover:text-gray-900">Compare all features ▾</button>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold mb-8">Join 3,000,000+ highly productive teams</h2>
            <div className="flex justify-center items-center gap-12 flex-wrap opacity-50">
              <img src="/placeholder.svg" alt="Samsung" className="h-8" />
              <img src="/placeholder.svg" alt="Belmond" className="h-8" />
              <img src="/placeholder.svg" alt="Booking.com" className="h-8" />
              <img src="/placeholder.svg" alt="IBM" className="h-8" />
              <img src="/placeholder.svg" alt="Padres" className="h-8" />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">FAQ</h2>
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

