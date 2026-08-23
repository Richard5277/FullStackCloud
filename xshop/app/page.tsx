'use client';

import Link from "next/link";
import Login from "./login/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>Welcome to XShop</h1>

      <button onClick={() => { router.push('/login') }}>LOGIN</button>
      <br />
      <Link href="/shop">Go to Shop</Link>

      <h1>Container Setup Success</h1>

      <h2>Container Updated - 3</h2>
    </div>
  );
}
