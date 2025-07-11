"use client";

import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";

import { track } from "@/lib/track";

import PlanBadge from "./PlanBadge";

export const Logo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function AppNavbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("navbar");

  const handleLogout = () => signOut({ callbackUrl: "/" });

  return (
    <Navbar isBordered>
      <NavbarBrand
        aria-label={t("home")}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Logo />
        <p className="font-bold text-inherit ml-2">PLANTSCARE</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/">{t("home")}</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/pricing" onClick={() => track("upgrade_click")}>
            {t("pricing")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/blog">{t("blog")}</Link>
        </NavbarItem>
        {session?.user && (
          <NavbarItem>
            <Link href="/dashboard">{t("dashboard")}</Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {session?.user ? (
          <>
            <PlanBadge className="mr-2" plan={session.user.plan} />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  aria-label={t("userMenu")}
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={session.user.name || "Usuario"}
                  size="sm"
                  src={`https://ui-avatars.com/api/?name=${session.user.name || "U"}&background=0D8ABC&color=fff`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label={t("userOptions")} variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t("signedInAs")}</p>
                  <p className="font-semibold text-gray-500 text-sm">
                    {session.user.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  onClick={() => router.push("/dashboard")}
                >
                  {t("dashboard")}
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <Button color="secondary" size="sm" onClick={() => signIn()}>
            {t("login")}
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
