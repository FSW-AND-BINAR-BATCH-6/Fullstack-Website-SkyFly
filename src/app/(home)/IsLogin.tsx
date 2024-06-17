"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { Bell, List, LogInIcon, User } from "lucide-react";
import Link from "next/link";

export default function IsLogin() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const isLogin = getCookie("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    if (isLogin) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return loggedIn ? (
    <div className="bg-red-200s w-1/2 flex items-center justify-end mr-14">
      <div className="flex items-center">
        <div>
          <Link href={"/history"}>
            <List className="w-5 h-5 mr-4 cursor-pointer" />
          </Link>
        </div>
        <div>
          <Link href={"/notifications"}>
            <Bell className="w-5 h-5 mr-4 cursor-pointer" />
          </Link>
        </div>
        <div>
          <Link href={"/account"}>
            <User className="w-5 h-5 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-red-200s w-1/2 flex items-center justify-end mr-14">
      <Link href="/login">
        <Button className="">
          <LogInIcon className="w-5 h-5 mr-2" />
          Login
        </Button>
      </Link>
    </div>
  );
}
