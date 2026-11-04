"use client";

import useSWR from "swr";
import {useParams} from "next/navigation";
import styled from "styled-components";
import ArtCard from "@/app/components/artworkCard";
import { Artwork } from "@/app/interfaces/art";
// import {NextResponse} from "next/server";

const ArtWrapper = styled.div`
    width: 80%;
    margin: auto;
    background-color: floralwhite;
    color: darkslategray;
`;

const ArtContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const fetcher = async (url:string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch artwork data");
    }
    return res.json();
};

export default function ArtPage() {
    const params = useParams<{artwork: string}>();
    const {data, error} = useSWR(`/api/getArtworkData?size=${encodeURIComponent(params.artwork)}`, fetcher);
    if (error) return <div>Failed to load: {error}</div>;
    if (!data) return <div>Loading...</div>

    const artworks: Artwork[] = data.records || [];

    return (
        <ArtWrapper>
            <h1>Harvard Art Museum: Collection</h1>
            {/*{params.artwork}*/}
            <ArtContainer>
                {artworks.map((artwork, i) => (
                    <ArtCard
                        key={artwork.title + i}
                        title={artwork.title}
                        description={artwork.description}
                        dated={artwork.dated}
                        culture={artwork.culture}
                        department={artwork.department}
                    />
                ))}
            </ArtContainer>
        </ArtWrapper>
    );
}