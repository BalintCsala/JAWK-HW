import {Route, Routes, useLocation} from "react-router-dom";
import ExplorePage from "./ExplorePage/ExplorePage.tsx";
import UserPage from "./UserPage/UserPage.tsx";
import {useEffect, useState} from "react";
import {PaginatedPosts} from "../../../api/posts.ts";
import Button, {ButtonSize} from "../../../components/Button/Button.tsx";

export interface PageProps {
    page: number;
    pagination: PaginatedPosts | null;
    setPagination: (pagination: PaginatedPosts) => void;
}

function Page() {
    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState<PaginatedPosts | null>(null);

    const location = useLocation();
    useEffect(() => {
        setPagination(null);
    }, [location.pathname]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<ExplorePage page={page} pagination={pagination} setPagination={setPagination} />} />
                <Route
                    path="/user/:username"
                    element={<UserPage page={page} pagination={pagination} setPagination={setPagination} />} />
            </Routes>
            <div>
                {!pagination?.first && (
                    <Button text="Prev" onClick={() => setPage(page - 1)} size={ButtonSize.Small} />
                )}
                {!(pagination?.first && pagination?.last) && (
                    <span>{page + 1}</span>
                )}
                {!pagination?.last && (
                    <Button text="Next" onClick={() => setPage(page + 1)} size={ButtonSize.Small} />
                )}
            </div>
        </>
    );
}

export default Page;