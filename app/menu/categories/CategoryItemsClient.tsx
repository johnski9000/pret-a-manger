"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { SimpleGrid, Card, Image, Text, Button } from "@mantine/core";
import { categories } from "@/data/categories";
import { menuItems, MenuItem } from "@/data/menu";
import { useBasket } from "@/context/BasketContext";

export default function CategoryItemsClient() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const { addItem } = useBasket();

  const category = categories.find((c) => c.slug === categorySlug);
  const filteredItems: MenuItem[] = menuItems.filter(
    (item) => item.categorySlug === categorySlug
  );

  const fallbackImage = "https://placehold.co/600x400/000000/FFFFFF/png";

  if (!category) {
    return (
      <div className="py-16 text-center">
        <Text ta="center" size="xl" fw={700}>
          Category not found
        </Text>
      </div>
    );
  }

  return (
    <div className="text-center mt-12">
      {/* Category Title */}
      <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
      <p className="mt-2 text-gray-600">
        Browse our {category.name.toLowerCase()} selection. Freshly prepared in
        our kitchens every day.
      </p>

      {/* Grid of menu items */}
      <div className="flex justify-center mt-8">
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: "sm", sm: "md", lg: "lg" }}
          style={{ maxWidth: 1400, width: "100%" }}
        >
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              shadow="sm"
              radius="md"
              withBorder
              className="hover:scale-105 transition-transform duration-200"
            >
              <Card.Section>
                <Image
                  src={item.image || fallbackImage}
                  alt={item.name}
                  height={180}
                  width="100%"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = fallbackImage)
                  }
                />
              </Card.Section>
              <Text fw={700} size="lg" mt="md">
                {item.name}
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                {item.description}
              </Text>
              <Text fw={700} size="md" mt="sm">
                £{item.price.toFixed(2)}
              </Text>
              <Button
                fullWidth
                mt="md"
                color="#8c042d"
                onClick={() =>
                  addItem({
                    menuItemId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    image: item.image,
                  })
                }
              >
                Add to Basket
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
