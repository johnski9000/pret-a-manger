"use client";

import React from "react";
import { Card, Image, Text, SimpleGrid, Container } from "@mantine/core";
import Link from "next/link";
import { categories, Category } from "@/data/categories";

function Categories() {
  return (
    <Container size="lg" py="xl">
      <Text component="h2" ta="center" fw={700} size="xl" mb="xl">
        Browse by Category
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: "sm", sm: "md", lg: "lg" }}
      >
        {categories.map((category: Category) => (
          <Link
            key={category.slug}
            href={`/menu/categories?category=${category.slug}`}
            passHref
          >
            <Card
              shadow="sm"
              radius="md"
              padding="md"
              withBorder
              className="hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <Card.Section>
                <Image
                  src={category.image}
                  alt={category.name}
                  height={160}
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              </Card.Section>

              <Text fw={700} size="lg" mt="md" ta="center">
                {category.name}
              </Text>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Categories;
