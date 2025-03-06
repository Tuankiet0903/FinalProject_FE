export async function fetchListsByFolderId(folderId) {
    try {
        const response = await fetch(`http://localhost:5000/list/lists/folder/${folderId}`);
        if (!response.ok) throw new Error(`Failed to fetch lists: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching lists for folder ${folderId}:`, error);
        return [];
    }
}
