"use client";
import React from "react";
import { ShoppingBasket, X, Plus, Minus, ArrowRight } from "lucide-react";
import { Drawer, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useBasket } from "@/context/BasketContext";

function Basket() {
  const [opened, { open, close }] = useDisclosure(false);
  const { items, updateQuantity, removeItem, clearBasket, total } = useBasket();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={open}
        className="relative flex justify-center items-center cursor-pointer bg-[#8c042d] border border-[#8c042d] rounded-md w-10 h-10 hover:scale-110 transition-transform hover:shadow-[#8c042d] hover:shadow-sm"
      >
        <ShoppingBasket size={25} color="white" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-[#8c042d] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#8c042d]">
            {totalItems}
          </span>
        )}
      </button>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="md"
        styles={{
          body: { height: "90%" },
        }}
        title={
          <div className="flex items-center gap-2">
            <ShoppingBasket size={24} color="#8c042d" />
            <span className="text-xl font-bold">Your Basket</span>
          </div>
        }
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <ShoppingBasket size={64} color="#e5e7eb" className="mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your basket is empty
            </h3>
            <p className="text-gray-500 mb-6">Add items to get started</p>
            <Button onClick={close} variant="filled" color="#8c042d">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="border-b border-gray-200 py-4 px-2"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        £{item.price.toFixed(2)} each
                      </p>
                    </div>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => removeItem(item.menuItemId)}
                    >
                      <X size={18} />
                    </ActionIcon>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ActionIcon
                        variant="outline"
                        color="#8c042d"
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity - 1)
                        }
                      >
                        <Minus size={16} />
                      </ActionIcon>
                      <span className="font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <ActionIcon
                        variant="outline"
                        color="#8c042d"
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity + 1)
                        }
                      >
                        <Plus size={16} />
                      </ActionIcon>
                    </div>
                    <span className="font-bold text-gray-800">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-auto">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#8c042d]">
                  £{total.toFixed(2)}
                </span>
              </div>

              <Button
                fullWidth
                size="lg"
                color="#8c042d"
                component="a"
                href="/checkout"
                rightSection={<ArrowRight size={20} />}
                className="mb-2"
              >
                Checkout
              </Button>

              <Button
                fullWidth
                variant="subtle"
                color="red"
                onClick={clearBasket}
              >
                Clear Basket
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

export default Basket;
