import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/AllSpaceHeader";
import { getSpacesByWorkspaceId } from "../../../api/space";
import CreateSpaceDialog from "../../../components/slideBar/CreateSpaceDialog";

export default function AllSpacesPage() {
  const { workspaceId } = useParams(); // ✅ Get workspaceId from URL
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]); // To store filtered spaces
  const [searchTerm, setSearchTerm] = useState(""); // To store the search term
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // To control sorting order

  useEffect(() => {
    if (!workspaceId) return; // ✅ Ensure workspaceId is available

    const loadSpaces = async () => {
      try {
        const spacesData = await getSpacesByWorkspaceId(workspaceId); // ✅ Fetch spaces for the workspace
        setSpaces(spacesData || []);
        setFilteredSpaces(spacesData || []); // Initially, show all spaces
      } catch (error) {
        console.error("Failed to fetch spaces:", error);
      }
    };

    loadSpaces();
  }, [workspaceId]);

  // ✅ Filter spaces based on search term
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    // Filter spaces based on search term
    const filtered = spaces.filter((space) =>
      space.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredSpaces(filtered);
  };

  // ✅ Sort spaces by name (A-Z)
  const handleSort = () => {
    const sortedSpaces = [...filteredSpaces];
    sortedSpaces.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name); // Sort A-Z
      } else {
        return b.name.localeCompare(a.name); // Sort Z-A
      }
    });
    setFilteredSpaces(sortedSpaces);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };

  // ✅ Handle creating a new space
  const handleCreateSpace = async (spaceName, description) => {
    if (!workspaceId) return;

    try {
      const newSpace = await createSpace({
        name: spaceName,
        description: description,
        workspaceId: workspaceId,
      });

      setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
      setFilteredSpaces((prevSpaces) => [...prevSpaces, newSpace]); // Add new space to filtered spaces
      setIsCreateSpaceOpen(false);
    } catch (error) {
      console.error("Failed to create space:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Main content */}
      <div className="flex-1">
        <Header />
        <div className="m-10 mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-300 min-h-[calc(100vh-120px)]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">All Spaces</h1>
            <button
              className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              onClick={() => setIsCreateSpaceOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> New Space
            </button>
          </div>

          {/* Search + Sort */}
          <div className="flex items-center justify-between mt-4 border-b pb-2">
            <button
              className="text-gray-600 hover:text-black text-sm"
              onClick={handleSort} // Toggle sort order when clicked
            >
              {sortOrder === "asc" ? "Alphabetical A-Z ▾" : "Alphabetical Z-A ▾"}
            </button>
            <div className="flex items-center border rounded-md px-3 py-1 bg-gray-100 w-80">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent focus:outline-none text-sm w-full"
                value={searchTerm}
                onChange={handleSearch} // Update the search term
              />
            </div>
          </div>

          {/* Spaces list */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6">
            {filteredSpaces.map((space) => (
              <div
                key={space.spaceId}
                className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <span className="w-8 h-8 flex items-center justify-center text-white bg-blue-500 rounded-full text-xs font-bold">
                  {space.name.charAt(0).toUpperCase()}
                </span>
                <span className="ml-2 text-sm font-medium">{space.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Space Dialog */}
      <CreateSpaceDialog
        open={isCreateSpaceOpen}
        onOpenChange={setIsCreateSpaceOpen}
        workspaceId={workspaceId}
        onSpaceCreated={handleCreateSpace}
      />
    </div>
  );
}
