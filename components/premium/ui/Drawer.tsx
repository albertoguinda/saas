"use client";

import type { SidebarProps } from "./Sidebar";

import Sidebar from "./Sidebar";

export interface DrawerProps extends SidebarProps {}

export default function Drawer(props: DrawerProps) {
  return <Sidebar overlay position="right" {...props} />;
}
