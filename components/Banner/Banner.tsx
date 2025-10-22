"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

interface BannerProps {
  mobileImage: string;
  desktopImage: string;
  heading: string;
  description: string;
  buttons?: {
    label: string;
    href: string;
    variant?: "filled" | "outline";
    color?: string;
    disabled?: boolean;
  }[];
}

const Banner: React.FC<BannerProps> = ({
  mobileImage,
  desktopImage,
  heading,
  description,
  buttons = [],
}) => {
  return (
    <div className="relative w-full">
      <div className="block md:hidden">
        <div className="relative w-full h-[400px] sm:h-[500px]">
          <Image
            src={mobileImage}
            alt="Homepage Banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px]">
          <Image
            src={desktopImage}
            alt="Homepage Banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-lg shadow-xl -mt-20 md:-mt-28 p-8 md:p-12 lg:p-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {heading}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((btn, index) => (
              <Button
                key={index}
                component="a"
                href={btn.href}
                variant={btn.variant || "filled"}
                size="lg"
                color={btn.color || "#8c042d"}
                className="px-8 py-3 text-base font-semibold"
                disabled={btn.disabled}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
