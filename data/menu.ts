export interface MenuItem {
  id: number;
  name: string;
  categorySlug: string;
  description: string;
  price: number;
  image: string;
}

export const menuItems: MenuItem[] = [
  // Sandwiches
  {
    id: 1,
    name: "Classic Ham & Cheese Sandwich",
    categorySlug: "sandwiches",
    description: "Freshly baked bread, smoked ham, and mature cheddar.",
    price: 4.5,
    image: "/placeholder/ham-cheese.jpg",
  },
  {
    id: 2,
    name: "Tuna & Sweetcorn Sandwich",
    categorySlug: "sandwiches",
    description: "Flaked tuna with sweetcorn mayo on wholemeal bread.",
    price: 4.7,
    image: "/placeholder/tuna-sandwich.jpg",
  },

  // Wraps
  {
    id: 3,
    name: "Chicken Caesar Wrap",
    categorySlug: "wraps",
    description:
      "Grilled chicken, crisp lettuce, Caesar dressing, in a whole wheat wrap.",
    price: 5.2,
    image: "/placeholder/chicken-caesar.jpg",
  },
  {
    id: 4,
    name: "Falafel & Hummus Wrap",
    categorySlug: "wraps",
    description: "Crispy falafel, hummus, and fresh salad in a tortilla.",
    price: 5.0,
    image: "/placeholder/falafel-wrap.jpg",
  },

  // Salads
  {
    id: 5,
    name: "Vegan Falafel Salad",
    categorySlug: "salads",
    description:
      "Falafel, mixed greens, cherry tomatoes, cucumber, tahini dressing.",
    price: 6.0,
    image: "/placeholder/falafel-salad.jpg",
  },
  {
    id: 6,
    name: "Chicken & Bacon Salad",
    categorySlug: "salads",
    description:
      "Grilled chicken, smoked bacon, mixed leaves, and a light vinaigrette.",
    price: 6.5,
    image: "/placeholder/chicken-salad.jpg",
  },

  // Hot Food
  {
    id: 7,
    name: "Margherita Pizza",
    categorySlug: "hot-food",
    description: "Classic tomato, mozzarella, and basil pizza.",
    price: 5.5,
    image: "/placeholder/margherita-pizza.jpg",
  },
  {
    id: 8,
    name: "Chicken & Veggie Pie",
    categorySlug: "hot-food",
    description:
      "Flaky pastry filled with tender chicken and seasonal vegetables.",
    price: 5.8,
    image: "/placeholder/chicken-pie.jpg",
  },

  // Soups
  {
    id: 9,
    name: "Carrot & Ginger Soup",
    categorySlug: "soups",
    description: "Smooth carrot soup with a hint of ginger, served hot.",
    price: 3.8,
    image: "/placeholder/carrot-soup.jpg",
  },
  {
    id: 10,
    name: "Tomato & Basil Soup",
    categorySlug: "soups",
    description: "Rich tomato soup with fresh basil.",
    price: 3.7,
    image: "/placeholder/tomato-soup.jpg",
  },

  // Breakfast
  {
    id: 11,
    name: "Avocado & Smoked Salmon Bagel",
    categorySlug: "breakfast",
    description: "Toasted bagel with smashed avocado and smoked salmon.",
    price: 5.2,
    image: "/placeholder/avocado-salmon-bagel.jpg",
  },
  {
    id: 12,
    name: "Bacon & Egg Breakfast Roll",
    categorySlug: "breakfast",
    description: "Soft roll filled with crispy bacon and fried egg.",
    price: 4.5,
    image: "/placeholder/bacon-egg-roll.jpg",
  },

  // Drinks
  {
    id: 13,
    name: "Espresso Coffee",
    categorySlug: "drinks",
    description: "Rich, bold espresso shot made from organic beans.",
    price: 2.1,
    image: "/placeholder/espresso.jpg",
  },
  {
    id: 14,
    name: "Green Smoothie",
    categorySlug: "drinks",
    description: "Spinach, kale, banana, and apple juice blended fresh.",
    price: 3.5,
    image: "/placeholder/green-smoothie.jpg",
  },

  // Snacks & Treats
  {
    id: 15,
    name: "Chocolate Brownie",
    categorySlug: "snacks-treats",
    description: "Rich chocolate brownie, perfect for a sweet treat.",
    price: 2.8,
    image: "/placeholder/brownie.jpg",
  },
];
