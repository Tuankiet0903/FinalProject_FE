import SpaceHeader from "../../../components/header/SpaceHeader";
import RecentItems from "../../../components/home/Recent";
import Docs from "../../../components/space/Docs";
import Bookmarks from "../../../components/space/Bookmarks";
import Folders from "../../../components/space/Folders";
import Lists from "../../../components/space/Lists";
import Resources from "../../../components/space/Resources";
import WorkloadChart from "../../../components/space/WorkloadChart";

export default function SpaceDetail() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <SpaceHeader />

      {/* Hàng đầu tiên */}
      <div className="grid grid-cols-3 gap-2 pt-3">
        <RecentItems />
        <Docs />
        <Bookmarks />
      </div>

     
      <div className="pt-3">
       
        <Lists />
      </div>

     
      <div className="grid grid-cols-2 gap-2 pt-3">
      <Folders />
        <WorkloadChart />
      </div>

    
      <div className="pt-5">
        <Resources />
      </div>
    </div>
  );
}
