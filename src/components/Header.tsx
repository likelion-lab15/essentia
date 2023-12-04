"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header role="banner" className="border-primary h-[80px] border">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        <Link
          href="/"
          className="flex h-[80px] w-[280px] items-center justify-center"
        >
          Home
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/about" className="text-primary-500" accessKey="1">
              ABOUT
            </Link>
          </li>
          <li>
            <Link href="/best" className="text-#222-500" accessKey="2">
              BEST
            </Link>
          </li>
          <li>
            <Link href="/brand" className="text-#222-500" accessKey="3">
              BRAND
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-#222-500" accessKey="4">
              WOMEN
            </Link>
          </li>
          <li>
            <Link href="/men" className="text-#222-500" accessKey="4">
              MEN
            </Link>
          </li>
          <li>
            <Link href="/magazine" className="text-#222-500" accessKey="4">
              MAGAZINE
            </Link>
          </li>
        </ul>

        <div>
          {/* <button
            aria-label="Open search"
            onClick={() => {}}
            className=" mx-2 h-3.5 w-3.5 bg-center bg-no-repeat"
          >
            <span>Search</span>
          </button> */}
          <Link
            href="/signup"
            aria-label="sign up"
            onClick={() => {}}
            className=" mx-2 h-3.5 w-3.5 bg-center bg-no-repeat"
          >
            <span>Sign up</span>
          </Link>
          <Link
            href="/mypage"
            aria-label="My page"
            onClick={() => {}}
            className=" mx-2 h-3.5 w-3.5 bg-center bg-no-repeat"
          >
            <span>My Page</span>
          </Link>
          <Link
            href="/signin"
            aria-label="Sign in"
            onClick={() => {}}
            className=" mx-2 h-3.5 w-3.5 bg-center bg-no-repeat"
          >
            <span>login</span>
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wish List"
            onClick={() => {}}
            className="mx-2 h-3.5 w-3.5 bg-center bg-no-repeat"
          >
            <span>wishlist</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
