import React, { useState } from "react";
import { Check, Zap, Crown, Sparkles, ArrowRight, Star } from "lucide-react";

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      price: isAnnual ? 0 : 0,
      period: "forever",
      description: "Perfect for trying out our platform",
      color: "#4fc6d4",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "Community support",
        "1 GB storage",
        "Basic templates",
      ],
      popular: false,
    },
    {
      name: "Professional",
      icon: Zap,
      price: isAnnual ? 19 : 25,
      period: isAnnual ? "per month, billed annually" : "per month",
      description: "For professionals and small teams",
      color: "#cba8b7",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "50 GB storage",
        "Premium templates",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: isAnnual ? 49 : 59,
      period: isAnnual ? "per month, billed annually" : "per month",
      description: "For large teams and organizations",
      color: "#4fc6d4",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "Dedicated support",
        "Advanced security",
        "Custom integrations",
        "SLA guarantee",
        "Team training",
        "White-label options",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#ebebeb] to-[#f9f5f0] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-[#4fc6d4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-[#cba8b7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-[#4fc6d4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4 sm:mb-6 animate-fade-in-down">
            <Star
              className="w-3 h-3 sm:w-4 sm:h-4 text-[#4fc6d4]"
              fill="#4fc6d4"
            />
            <span className="text-xs sm:text-sm text-[#252829] font-medium">
              Simple, transparent pricing
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#252829] mb-4 sm:mb-6 px-4 animate-fade-in-down animation-delay-200">
            Choose Your Perfect Plan
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5c676d] max-w-2xl mx-auto mb-6 sm:mb-8 px-4 animate-fade-in-down animation-delay-400">
            Start free and scale as you grow. All plans include a 14-day free
            trial.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap animate-fade-in-down animation-delay-600 px-4">
            <span
              className={`text-xs sm:text-sm font-medium transition-colors ${
                !isAnnual ? "text-[#252829]" : "text-[#5c676d]"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 sm:w-14 sm:h-7 bg-[#4fc6d4] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div
                className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? "transform translate-x-6 sm:translate-x-7" : ""
                }`}
              />
            </button>
            <span
              className={`text-xs sm:text-sm font-medium transition-colors ${
                isAnnual ? "text-[#252829]" : "text-[#5c676d]"
              }`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-[#4fc6d4] to-[#cba8b7] text-white text-xs font-semibold rounded-full animate-bounce-in">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === index;

            return (
              <div
                key={index}
                className={`relative group animate-fade-in-up ${
                  plan.popular ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="px-3 sm:px-4 py-1 bg-gradient-to-r from-[#4fc6d4] to-[#cba8b7] text-white text-xs font-bold rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div
                  className={`h-full bg-white rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 border-2 ${
                    plan.popular
                      ? "border-[#4fc6d4] lg:scale-105"
                      : "border-transparent hover:border-[#cba8b7]"
                  } ${isHovered ? "transform -translate-y-2 shadow-2xl" : ""}`}
                  style={{
                    boxShadow: isHovered
                      ? `0 20px 60px -10px ${plan.color}40`
                      : undefined,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500"
                    style={{
                      backgroundColor: `${plan.color}20`,
                      transform: isHovered
                        ? "scale(1.1) rotate(5deg)"
                        : "scale(1) rotate(0deg)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-500"
                      style={{ color: plan.color }}
                    />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#252829] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#5c676d] text-xs sm:text-sm mb-4 sm:mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-[#252829]">
                        ${plan.price}
                      </span>
                      <span className="text-[#5c676d] text-xs sm:text-sm ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 mb-6 sm:mb-8 flex items-center justify-center gap-2 group/btn text-sm sm:text-base"
                    style={{
                      backgroundColor: plan.popular
                        ? plan.color
                        : "transparent",
                      color: plan.popular ? "white" : plan.color,
                      border: `2px solid ${plan.color}`,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  {/* Features */}
                  <ul className="space-y-3 sm:space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-start gap-2 sm:gap-3 animate-slide-in-left"
                        style={{
                          animationDelay: `${index * 200 + fIndex * 50}ms`,
                        }}
                      >
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: plan.color }}
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-[#252829] text-xs sm:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up animation-delay-800">
          <h2 className="text-3xl font-bold text-[#252829] mb-4">
            Still have questions?
          </h2>
          <p className="text-[#5c676d] mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#4fc6d4] to-[#cba8b7] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}
