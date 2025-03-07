import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SpaceHeader from "../../../components/header/SpaceHeader";
import RecentItems from "../../../components/home/Recent";
import Docs from "../../../components/space/Docs";
import Bookmarks from "../../../components/space/Bookmarks";
import Folders from "../../../components/space/Folders";
import Lists from "../../../components/space/Lists";
import Resources from "../../../components/space/Resources";
import WorkloadChart from "../../../components/space/WorkloadChart";
import { fetchFoldersBySpaceId } from "../../../api/space"; 
import { fetchListsByFolderId } from "../../../api/List"; 

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * ✅ Hàm fetch lại danh sách Lists khi có thay đổi
   */
  const refreshLists = useCallback(async () => {
    setLoading(true);
    try {
      const listsByFolder = {};
      await Promise.all(
        folders.map(async (folder) => {
          const listData = await fetchListsByFolderId(folder.folderId);
          listsByFolder[folder.folderId] = listData;
        })
      );
      setLists(listsByFolder);
    } catch (error) {
      console.error("Failed to refresh lists:", error);
    } finally {
      setLoading(false);
    }
  }, [folders]);

  /**
   * ✅ Fetch danh sách folders và lists khi spaceId thay đổi
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const folderData = await fetchFoldersBySpaceId(spaceId);
        setFolders(folderData);

        const listsByFolder = {};
        await Promise.all(
          folderData.map(async (folder) => {
            const listData = await fetchListsByFolderId(folder.folderId);
            listsByFolder[folder.folderId] = listData;
          })
        );

        setLists(listsByFolder);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (spaceId) {
      fetchData();
    }
  }, [spaceId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <SpaceHeader />

      <div className="grid grid-cols-3 gap-2 pt-3">
        <RecentItems />
        <Docs />
        <Bookmarks />
      </div>

      <div className="pt-3">
        {loading ? <p>Loading Lists...</p> : <Lists folders={folders} lists={lists} refreshLists={refreshLists} />}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3">
        {loading ? <p>Loading Folders...</p> : <Folders folders={folders} />}
        <WorkloadChart />
      </div>

      <div className="pt-5">
        <Resources />
      </div>
    </div>
  );
}
