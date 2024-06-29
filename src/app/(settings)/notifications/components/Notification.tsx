"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { getCookie } from "cookies-next";
import { ArrowLeftIcon, ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNotifications, Notifications } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notifications[]>(
    []
  );
  const [readNotifications, setReadNotifications] = useState<
    string[]
  >([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" } as const;
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = getCookie("token") as string | undefined;
        if (token) {
          const data = await getNotifications(token);
          setNotifications(data);
        }
      } catch (error) {
        return [];
      }
    };

    const savedReadNotifications = JSON.parse(
      localStorage.getItem("readNotifications") || "[]"
    );
    setReadNotifications(savedReadNotifications);

    getToken();
  }, []);

  const handleNotificationClick = (notificationId: string) => {
    if (!readNotifications.includes(notificationId)) {
      const updatedReadNotifications = [
        ...readNotifications,
        notificationId,
      ];
      setReadNotifications(updatedReadNotifications);
      localStorage.setItem(
        "readNotifications",
        JSON.stringify(updatedReadNotifications)
      );
    }
  };

  return (
    <>
      <div className="w-4/5 mx-auto py-7">
        <Labels className="font-bold text-xl">Notifications</Labels>
        <div className="mt-5 flex flex-row gap-3 items-center">
          <div className="w-full sm:w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            </Link>
            <Labels className="ml-5">Home Page</Labels>
          </div>
          <div className="">
            <Button className="rounded-full bg-primaryPurple">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              <Labels className="cursor-pointer">Filter</Labels>
            </Button>
          </div>
          <div className="">
            <Search className="w-5 h-5 text-violet font-bold cursor-pointer" />
          </div>
        </div>
      </div>
      <hr className="border-black/20" />

      <div className="w-full px-5 md:w-4/5 mx-auto mt-5">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="w-full md:w-4/5 mt-4 mb-4 p-5 gap-3 flex flex-row rounded-sm shadow-xl border border-black/20 cursor-pointer"
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex-shrink-0 md:mb-0 md:mr-4">
                <Image
                  src="/assets/bell.svg"
                  alt="logo"
                  width={50}
                  height={50}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-cover"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row">
                  <div>
                    <Labels className="text-gray-500">
                      {notification.type}
                    </Labels>
                  </div>
                  <div className="mt-2 md:mt-0 ml-auto flex flex-row">
                    <Labels className="text-gray-500">
                      {formatDate(notification.date)},{" "}
                      {notification.time}
                    </Labels>
                    {!readNotifications.includes(notification.id) && (
                      <div className="w-3 h-3 rounded-full ml-2 bg-green-500"></div>
                    )}
                  </div>
                </div>
                <div className="my-1">
                  <Labels className="text-base">
                    {notification.notificationsTitle}
                  </Labels>
                </div>
                <div>
                  <Labels className="text-gray-500">
                    {notification.notificationsContent}
                  </Labels>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="w-full md:w-4/5 mt-4 mb-4 p-5 gap-3 flex flex-row rounded-sm shadow-xl border border-black/20"
              >
                <div className="flex-shrink-0 md:mb-0 md:mr-4">
                  <Image
                    src="/assets/bell.svg"
                    alt="logo"
                    width={50}
                    height={50}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-cover"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row">
                    <div>
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="mt-2 md:mt-0 ml-auto flex flex-row">
                      <Skeleton className="h-5 w-32" />
                      <div className="w-3 h-3 rounded-full ml-2 bg-green-500"></div>
                    </div>
                  </div>
                  <div className="my-1">
                    <Skeleton className="h-5 w-64" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-96" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
