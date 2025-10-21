"use client";
import React from "react";
import { CircleUser, LogOut, Settings, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Menu } from "@mantine/core";
import { createClient } from "@/utils/supabase/client";

function User() {
  const { user, openLoginModal } = useAuth();
  const name = user?.user_metadata?.name;
  const email = user?.email;
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <button
        onClick={() => openLoginModal()}
        className="flex justify-center items-center cursor-pointer bg-white border border-gray-300 rounded-md w-10 h-10 hover:scale-110 transition-transform hover:shadow-[#8c042d] hover:shadow-sm"
      >
        <CircleUser size={25} color="#8c042d" />
      </button>
    );
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <button className="flex justify-center items-center cursor-pointer bg-white border border-gray-300 rounded-md w-10 h-10 hover:scale-110 transition-transform hover:shadow-[#8c042d] hover:shadow-sm">
          <span className="text-[#8c042d] font-medium text-xl">
            {name?.charAt(0).toUpperCase()}
          </span>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <div className="px-2 py-1">
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </Menu.Label>

        <Menu.Divider />

        <Menu.Item leftSection={<UserIcon size={16} />}>Profile</Menu.Item>

        <Menu.Item leftSection={<Settings size={16} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<LogOut size={16} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default User;
