import Banner from "@/components/Banner/Banner";
import Categories from "@/components/Menu/Categories";
import React from "react";

function page() {
  return (
    <main>
      <Banner
        mobileImage="/Menu_Mobile.jpg"
        desktopImage="/Menu_Desktop.jpg"
        heading="Browse our menu"
        description="Our freshly prepared food is made or baked in our shop kitchens throughout the day. Our coffee is organic and always arabica. Our teas, milks and milk alternatives are all organic too."
        buttons={[
          {
            label: "Find Nearest Pret",
            href: "/find-a-pret",
            variant: "filled",
            color: "#8c042d",
          },
          {
            label: "Contact Us",
            href: "/contact",
            variant: "outline",
            color: "#8c042d",
          },
        ]}
      />
      <Categories />
    </main>
  );
}

export default page;
