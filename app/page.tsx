
"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

const StyledDiv = styled.div`
    display: flex;
    background-color: antiquewhite;
    flex-direction: column;
    //margin: 0;
    //color: darkgray;
`;

const StyledLink = styled(Link)`
text-align: center;
color: rebeccapurple;
`;

export default function Home() {
    const [artwork, setArtwork] = useState("");

    return (
        <StyledDiv>
            <h1>Search through collections in the Harvard Art Museum</h1>
            <p>Enter a number from 1 to 100.</p>
            <input type="number" value={artwork} placeholder="Number of Artworks"
                onChange={(e) => setArtwork(e.target.value)}
            />
            <StyledLink href={`/${artwork}`}>
                Get Artworks
            </StyledLink>
        </StyledDiv>
    );
}
