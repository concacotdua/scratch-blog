"use client";

import { useSearchParams } from "next/navigation";

export const useQuerySearch = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    return search;
};

