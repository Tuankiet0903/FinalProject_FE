// import  { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchWorkspaceByID } from "../../../api/workspace";

// import React from "react";
// import { useLocation } from "react-router-dom";
// import SpaceHeader from "../../../components/header/SpaceHeader";
// import RecentItems from "../../../components/home/Recent";
// import Docs from "../../../components/space/Docs";
// import Bookmarks from "../../../components/space/Bookmarks";
// import Folders from "../../../components/space/Folders";
// import Lists from "../../../components/space/Lists";
// import Resources from "../../../components/space/Resources";
// import WorkloadChart from "../../../components/space/WorkloadChart";

// export default function SpaceDetail() {
//  const { workspaceId } = useParams(); // Lấy workspaceId từ URL
// const [workspace, setWorkspace] = useState(null);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//     const fetchWorkspace = async () => {
//         try {
//             const data = await fetchWorkspaceById(workspaceId);
//             setWorkspace(data);
//         } catch (error) {
//             console.error("Failed to fetch workspace details:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchWorkspace();
// }, [workspaceId]);

// if (loading) return <p>Loading workspace...</p>;
// if (!workspace) return <p>Workspace not found</p>;


//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <SpaceHeader  />

//       {/* Hàng đầu tiên */}
//       <div className="grid grid-cols-3 gap-2 pt-3">
//         <RecentItems  />
//         <Docs  />
//         <Bookmarks  />
//       </div>

//       {/* Danh sách */}
//       <div className="pt-3">
//         <Lists  />
//       </div>

//       {/* Thư mục và workload */}
//       <div className="grid grid-cols-2 gap-2 pt-3">
//         <Folders  />
//         <WorkloadChart  />
//       </div>

//       {/* Resources */}
//       <div className="pt-5">
//         <Resources />
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkspaceById } from "../../../api/workspace";
import SpaceHeader from "../../../components/header/SpaceHeader";

export default function SpaceDetail() {
    const { workspaceId } = useParams(); // Lấy workspaceId từ URL
    const [workspace, setWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                const data = await fetchWorkspaceById(workspaceId);
                setWorkspace(data);
            } catch (error) {
                console.error("Failed to fetch workspace details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspace();
    }, [workspaceId]);

    if (loading) return <p>Loading workspace...</p>;
    if (!workspace) return <p>Workspace not found</p>;

    return (
        
        <div className="bg-gray-100 min-h-screen p-6">
            <SpaceHeader/>
            <h1 className="text-2xl font-bold text-gray-800">{workspace.name}</h1>
            <p className="text-gray-600">{workspace.description}</p>

            <div className="mt-4">
                <strong>Type:</strong> {workspace.type}
            </div>
            <div>
                <strong>Favorite:</strong> {workspace.favorite ? "Yes" : "No"}
            </div>
            <div>
                <strong>Created At:</strong> {new Date(workspace.createdAt).toLocaleString()}
            </div>
        </div>
    );
}
