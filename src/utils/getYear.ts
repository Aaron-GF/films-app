export const getYear = (date: {
  media_type: string;
  release_date?: string;
  first_air_date?: string;
}) => {
  if (date.media_type === "movie") {
    return parseInt(date.release_date.substring(0, 4));
  } else if (date.media_type === "tv") {
    return parseInt(date.first_air_date.substring(0, 4));
  } else {
    return -1;
  }
};
