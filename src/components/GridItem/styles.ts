import styled from 'styled-components';

type ContainerProps = {
    shownBackGround: boolean;
}
export const Container = styled.div<ContainerProps>`
    border-radius: 10px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.shownBackGround ? '#1550FF' : '#E2E3E3'};

    @media (max-width: 750px) {
        height: 100px;

    }
`;

type IconProps = {
    opacity?: number;
}
export const Icon = styled.img<IconProps>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
    opacity: ${props => props.opacity ?? 1};

    @media (max-width: 750px) {
        object-fit: fill;
    }
`;