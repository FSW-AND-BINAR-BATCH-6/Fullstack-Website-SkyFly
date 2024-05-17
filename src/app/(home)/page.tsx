"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <Input placeholder="Email" />
        <Button className="w-full mt-3 mb-10">Daftar</Button>
      </div>
    </main>
  );
}
