import { getSeriesDetails } from "@/lib/endpoints";

export default async function SeriesDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const series = await getSeriesDetails(id);
    console.log(series);
    return <div>{series.name}</div>;
}
