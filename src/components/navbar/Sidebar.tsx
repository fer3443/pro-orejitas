"use client";
import { IoReorderThree } from "react-icons/io5";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import { UserLinks } from "../users/UserLinks";

interface Props {
  links: {
    path: string;
    name: string;
  }[];
}

export const Sidebar = ({ links }: Props) => {
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState<boolean>(false);
  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      <SheetTrigger className="cursor-pointer">
        <IoReorderThree size={30} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex flex-col gap-y-6 text-end pr-10">
            {links.map((link) => (
              <Link
                href={link.path}
                key={link.name}
                onClick={() => setToggle(false)}
                className={clsx("font-semibold", {
                  "text-blue-500": pathname === link.path,
                })}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Separator />
          <div className="text-end pr-10">
            <UserLinks onClose={() => setToggle(false)}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};