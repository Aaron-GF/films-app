export const getYear = (date: {
  media_type: string;
  release_date?: string;
  first_air_date?: string;
}): number => {
  if (date.media_type === "movie" && date.release_date) {
    return parseInt(date.release_date.substring(0, 4));
  } else if (date.media_type === "tv" && date.first_air_date) {
    return parseInt(date.first_air_date.substring(0, 4));
  }
  return -1;
};