"use client";
import React from "react";
import Logo from "./Logo";
import User from "./User";
import Basket from "./Basket";
import {
  Menu as MenuIcon,
  CircleUser,
  LogOut,
  Settings,
  User as UserIcon,
  Home,
  UtensilsCrossed,
  Info,
  Phone,
} from "lucide-react";
import { Drawer, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/utils/supabase/client";

function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, openLoginModal } = useAuth();
  const supabase = createClient();

  const Menu_Items = [
    { name: "Home", link: "/", icon: Home },
    { name: "Menu", link: "/menu", icon: UtensilsCrossed },
    { name: "About", link: "/about", icon: Info },
    { name: "Contact", link: "/contact", icon: Phone },
  ];

  const name = user?.user_metadata?.name;
  const email = user?.email;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    close();
  };

  return (
    <>
      <nav className="w-full h-16 bg-white flex items-center justify-between px-4 py-2 shadow-md">
        <div className="flex items-center gap-6">
          <Logo />

          <ul className="hidden md:flex gap-6">
            {Menu_Items.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  className="text-gray-700 hover:text-[#8c042d] font-medium transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center items-center gap-3">
          <button
            onClick={open}
            className="md:hidden flex justify-center items-center cursor-pointer bg-white border border-gray-300 rounded-md w-10 h-10 hover:scale-110 transition-transform hover:shadow-sm"
          >
            <MenuIcon size={25} color="#8c042d" />
          </button>

          <div className="hidden md:block">
            <User />
          </div>
          <Basket />
        </div>
      </nav>

      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="xs"
        title={<Logo />}
      >
        <div className="flex flex-col h-full">
          {user ? (
            <div className="mt-auto mb-4">
              <div className="px-4 py-3 bg-gray-50 rounded-md mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-[#8c042d] rounded-full w-10 h-10">
                    <span className="text-white font-medium text-lg">
                      {name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                </div>
              </div>
              <nav className="flex flex-col gap-2 pt-4">
                {Menu_Items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={close}
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 hover:text-[#8c042d] font-medium py-3 px-4 rounded-md transition-colors"
                    >
                      <IconComponent size={18} />
                      {item.name}
                    </a>
                  );
                })}
              </nav>

              <Divider my="md" />
              <a
                href="/profile"
                onClick={close}
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 hover:text-[#8c042d] font-medium py-3 px-4 rounded-md transition-colors"
              >
                <UserIcon size={18} />
                Profile
              </a>

              <a
                href="/settings"
                onClick={close}
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 hover:text-[#8c042d] font-medium py-3 px-4 rounded-md transition-colors"
              >
                <Settings size={18} />
                Settings
              </a>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 font-medium py-3 px-4 rounded-md transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-auto mb-4 px-4">
              <nav className="flex flex-col gap-2 pt-4">
                {Menu_Items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={close}
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 hover:text-[#8c042d] font-medium py-3 px-4 rounded-md transition-colors"
                    >
                      <IconComponent size={18} />
                      {item.name}
                    </a>
                  );
                })}
              </nav>

              <Divider my="md" />
              <button
                onClick={() => {
                  close();
                  openLoginModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#8c042d] text-white font-medium py-3 px-4 rounded-md hover:bg-[#6d0323] transition-colors"
              >
                <CircleUser size={20} />
                Sign In
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
