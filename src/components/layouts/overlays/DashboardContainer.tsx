import React, { FC } from "react";
import AdminSidebar from "../admin/AdminSlidebar";

interface DashboardContainerProps {
    children?: React.ReactNode;
    className?: string;
}

export const DashboardContainer: FC<DashboardContainerProps> = ({
    children,
    className,
}) => {
    let containerClass = "flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100";
    if (className) {
        containerClass += ` ${className}`;
    }
    return (
        <div className={containerClass}>
            <div className="flex flex-row w-full">
                <div className="md:w-1/6">
                    <AdminSidebar />
                </div>
                <div className="md:w-5/6 p-6 sm:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
