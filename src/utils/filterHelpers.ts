import { Media } from '../types/mediaType';

export const filterDuplicates = (
    existingData: Media[],
    newData: Media[],
): Media[] => {
    const seenIds = new Set(existingData.map((item) => item.id));
    return newData.filter((item) => !seenIds.has(item.id));
};
