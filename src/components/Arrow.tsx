import styled from "styled-components";

interface ArrowProps {
  direction?: "higher" | "lower" | "same";
}

const Arrow = ({ direction }: ArrowProps) => {
  return (
    <>
      {
        direction && direction !== "same" &&
        <ArrowSvg $lower={direction === "lower"} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z"/>
        </ArrowSvg>
      }
    </>
  )
}

const ArrowSvg = styled.svg<{ $lower: boolean }>`
  transform: rotate(${({ $lower }) => $lower ? "180deg" : "0deg"});
`

export default Arrow;
