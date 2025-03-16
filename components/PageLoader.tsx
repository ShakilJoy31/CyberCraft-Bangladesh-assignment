// components/Loader.tsx
import React from "react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
            <div className="bg-white p-4 rounded-md bg-opacity-50">
                <div className="loader_global_template_2 mx-auto"></div>
            </div>
        </div>
    );
};

export default PageLoader;