import {NextResponse} from 'next/server';

export const dynamic = "force-dynamic";
const ART_API = process.env.API_KEY;
export async function GET(request:Request): Promise<NextResponse>{
    const {searchParams} = new URL(request.url);
    const size = Number(searchParams.get("size"));
    if (!Number.isInteger(size) || size < 1 || size > 100) {
        return NextResponse.json({error: "Invalid number provided; Pick between 1 and 100."}, {status:400});
    }
    if (!ART_API) {
        return NextResponse.json({error: "API key invalid"}, {status:500});
    }
    try {
        const apiURL = new URL("https://api.harvardartmuseums.org/object?&page=42");
        apiURL.searchParams.set("size", size.toString());
        apiURL.searchParams.set("apikey", ART_API);
        const res = await fetch(apiURL.toString());
        if (res.status !== 200) {
            return NextResponse.json({err: "An error occurred while fetching artwork data"}, {status:500});
        }
        const data = await res.json();
        return NextResponse.json(data);

    } catch {
        return NextResponse.json({error: "An error occurred while fetching artwork data"}, {status:500})
    }
    // const res = await fetch(`https://api.harvardartmuseums.org/object?size=${numArtwork}&apikey=${ART_API}`);
    // if (res.status !== 200) {
    //     return NextResponse.json({err: "An error occurred while fetching artwork data"}, {status:500});
    // }
    // const data = await res.json();
    // return NextResponse.json(data);
}