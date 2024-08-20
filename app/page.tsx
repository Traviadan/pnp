
import LoadingContainer from "@/components/global/LoadingContainer";
import Home from "@/components/home/Home";
import { Suspense } from "react";
import FavoriteCharacters from "@/components/home/FavoriteCharacters";

export default function HomePage() {
  return (
    <>
      <Home />

      <Suspense fallback={<LoadingContainer />}>
        <FavoriteCharacters />
      </Suspense>
    </>
  );
}
