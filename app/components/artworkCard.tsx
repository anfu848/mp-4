import styled from "styled-components";
import {Artwork} from "@/app/interfaces/art";

const ArtContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function ArtCard(props: Artwork) {
    return (
        <ArtContainer className="art-card">
            <h2>Title: {props.title}</h2>
            <p>Department: {props.department}</p>
            <p>Dated to: {props.dated}</p>
            <p>Culture: {props.culture}</p>
            <p>Description: {props.description}</p>
            <br/>
        </ArtContainer>
    )
}
