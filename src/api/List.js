import { API_ROOT } from "../utils/constants";

export async function fetchListsByFolderId(folderId) {
    try {
        const response = await fetch(`${API_ROOT}/list/lists/folder/${folderId}`);
        if (!response.ok) throw new Error(`Failed to fetch lists: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching lists for folder ${folderId}:`, error);
        return [];
    }
}
