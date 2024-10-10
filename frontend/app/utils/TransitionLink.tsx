"use client";
import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

const TransitionLink = ({ children, href, ...props }: TransitionLinkProps) => {
  return (
    <AnimatePresence>
      <motion.div>
        <Link href={href}>{children}</Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionLink;
