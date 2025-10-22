"use client";

import React, { useState } from "react";
import { useBasket } from "@/context/BasketContext";
import {
  Card,
  Image,
  Text,
  Group,
  NumberInput,
  Button,
  Divider,
} from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { showNotification } from "@mantine/notifications";

type Step = "basket" | "checkout" | "confirmation";

export default function CheckoutFlow() {
  const { items, total, updateQuantity, removeItem, clearBasket } = useBasket();
  const [step, setStep] = useState<Step>("basket");

  const handlePayNow = () => {
    showNotification({
      title: "Order Confirmed",
      message: "Your payment was successful!",
      color: "pink",
    });
    clearBasket();
    setStep("confirmation");
  };

  const stepNames: Step[] = ["basket", "checkout", "confirmation"];

  const renderStepIndicator = () => (
    <div className="flex justify-center gap-4 mb-8">
      {stepNames.map((s, i) => {
        const isActive = s === step;
        const isCompleted =
          stepNames.indexOf(s) < stepNames.indexOf(step) &&
          step !== "confirmation";
        return (
          <div
            key={s}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (isCompleted) setStep(s);
            }}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                isActive || isCompleted
                  ? "border-[#8c042d] bg-[#8c042d] text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <Text color={isActive || isCompleted ? "#8c042d" : "gray"}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
            {i < stepNames.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  isCompleted ? "bg-[#8c042d]" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-8 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto flex flex-col gap-8">
        {renderStepIndicator()}

        <AnimatePresence mode="wait">
          {step === "basket" && (
            <motion.div
              key="basket"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col lg:flex-row gap-8"
            >
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                {items.length === 0 ? (
                  <div className="py-24 text-center">
                    <Text size="2xl">Your basket is empty</Text>
                  </div>
                ) : (
                  items.map((item) => (
                    <Card
                      key={item.menuItemId}
                      shadow="sm"
                      radius="md"
                      withBorder
                      className="p-4 bg-gray-50 border-gray-200 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <Group>
                          <Image
                            src={
                              item.image ||
                              "https://placehold.co/600x400/000000/FFFFFF/png"
                            }
                            alt={item.name}
                            width={80}
                            height={60}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="flex flex-col gap-1">
                            <Text fw={500}>{item.name}</Text>
                            <Text size="sm" color="dimmed">
                              £{item.price.toFixed(2)}
                            </Text>
                            <Group gap="xs">
                              <NumberInput
                                value={item.quantity}
                                min={1}
                                onChange={(val) => {
                                  const quantity =
                                    typeof val === "number"
                                      ? val
                                      : parseInt(String(val ?? "1"), 10) || 1;
                                  updateQuantity(item.menuItemId, quantity);
                                }}
                                styles={{ input: { width: 60 } }}
                              />
                              <Button
                                color="#8c042d"
                                variant="outline"
                                onClick={() => removeItem(item.menuItemId)}
                              >
                                Remove
                              </Button>
                            </Group>
                          </div>
                        </Group>
                        <Text fw={700} size="lg">
                          £{(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <Card
                  shadow="sm"
                  radius="md"
                  withBorder
                  className="p-5 flex flex-col gap-4"
                >
                  <Text size="lg" fw={700}>
                    Order Summary
                  </Text>
                  <div className="flex justify-between">
                    <Text color="dimmed">Subtotal:</Text>
                    <Text>£{total.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text color="dimmed">Delivery:</Text>
                    <Text>Free</Text>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <Text color="dimmed">Tax:</Text>
                    <Text>£0.00</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text fw={700}>Total:</Text>
                    <Text fw={700} color="#8c042d">
                      £{total.toFixed(2)}
                    </Text>
                  </div>
                  <Button
                    fullWidth
                    color="#8c042d"
                    mt="md"
                    onClick={() => setStep("checkout")}
                  >
                    Continue to Checkout
                  </Button>
                </Card>
              </div>
            </motion.div>
          )}

          {step === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col lg:flex-row gap-8"
            >
              <div className="w-full lg:w-2/3">
                <Card className="p-6 bg-white border border-gray-200">
                  <Text size="xl" fw={700} mb={4}>
                    Payment
                  </Text>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePayNow();
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      required
                      className="border p-2 rounded"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="border p-2 rounded flex-1"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        required
                        className="border p-2 rounded w-24"
                      />
                    </div>

                    <div className="flex gap-4 mt-2">
                      <Button type="submit" color="#8c042d" fullWidth>
                        Pay Now
                      </Button>
                      <Button
                        variant="outline"
                        color="#8c042d"
                        fullWidth
                        onClick={() => setStep("basket")}
                      >
                        Back to Basket
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <Card
                  shadow="sm"
                  radius="md"
                  withBorder
                  className="p-5 flex flex-col gap-4"
                >
                  <Text size="lg" fw={700}>
                    Order Summary
                  </Text>
                  <div className="flex justify-between">
                    <Text color="dimmed">Subtotal:</Text>
                    <Text>£{total.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text color="dimmed">Delivery:</Text>
                    <Text>Free</Text>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <Text color="dimmed">Tax:</Text>
                    <Text>£0.00</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text fw={700}>Total:</Text>
                    <Text fw={700} color="#8c042d">
                      £{total.toFixed(2)}
                    </Text>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center py-16"
            >
              <div className="w-full text-center flex flex-col gap-6">
                <Text size="3xl" fw={700}>
                  Your Order Is Confirmed!
                </Text>
                <Text size="lg" color="dimmed">
                  Thank you for your purchase. Your items will be shipped soon.
                </Text>
                <Button color="#8c042d" mt="md" component="a" href="/menu">
                  Back to Menu
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
