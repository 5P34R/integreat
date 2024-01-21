"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to "/login" when the component mounts
    router.push("/auth/login");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img
          src="/icon.jpg"
          alt="Company Icon"
          className="w-72 h-20 mb-8" // Adjust the size of your image and add margin bottom
        />
        {/* <button
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none"
          // onClick={() => router.push("/auth/login")}
        >
          Login
        </button> */}
      </div>
    </>
  );
}