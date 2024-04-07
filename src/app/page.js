'use client'
import Image from "next/image";
import {
  Typography,
  Card
} from "@material-tailwind/react";
export default function Home() {
  return (
    
      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
         
        </Card>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          What is Next Auth
        </Typography>
        <Typography color="gray" className="font-normal">
        NextAuth.js is a complete open-source authentication solution for Next.js applications. It is a flexible authentication library that supports various authentication methods such as email/password, OAuth providers (e.g., Google, Facebook, GitHub), and more.
        </Typography>
      </div>
  
  );
}
