"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      role="banner"
      className="h-[80px] border-b border-primary pl-[60px] pr-[60px]"
    >
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        <Link
          href="/"
          className="flex h-[80px] w-[140px] items-center justify-center"
        >
          <Image src="/Logo.png" alt="Home" width={120} height={55} />
        </Link>
        <ul className="text-primary-500 flex w-[500px] justify-between text-16 ">
          <li>
            <Link href="/about" className="" accessKey="1">
              ABOUT
            </Link>
          </li>
          <li>
            <Link href="/best" className="text-primary-500" accessKey="2">
              BEST
            </Link>
          </li>
          <li>
            <Link href="/brand" className="text-primary-500" accessKey="3">
              BRAND
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-primary-500" accessKey="4">
              WOMEN
            </Link>
          </li>
          <li>
            <Link href="/men" className="text-primary-500" accessKey="4">
              MEN
            </Link>
          </li>
          <li>
            <Link href="/magazine" className="text-primary-500" accessKey="4">
              MAGAZINE
            </Link>
          </li>
        </ul>

        <div className="flex h-[80px] w-[280px] justify-between pl-[80px] ">
          <button
            aria-label="Open search"
            onClick={() => {}}
            className="bg-center bg-no-repeat"
          >
            <Image src="/search-icon.svg" alt="Home" width={24} height={24} />
          </button>
          <button
            aria-label="My Page"
            onClick={() => {}}
            className="bg-center bg-no-repeat"
          >
            <Image src="/user-icon.svg" alt="Home" width={24} height={24} />
          </button>
          <button
            aria-label="Sign In"
            onClick={() => {}}
            className="bg-center bg-no-repeat"
          >
            <Image src="/signin-icon.svg" alt="Home" width={24} height={24} />
          </button>
          <button
            aria-label="Wish List"
            onClick={() => {}}
            className="bg-center bg-no-repeat"
          >
            <Image
              src="/blackheart-icon.svg"
              alt="Home"
              width={24}
              height={24}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
