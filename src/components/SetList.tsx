import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SetList = () => {
  const [sets, setSets] = useState<
    {
      id: any;
      name: any;
      code: any;
      released_at: any;
      icon_svg_uri: any;
      set_type: any;
    }[]
  >([]);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.get("https://api.scryfall.com/sets").then(({ data }) => {
      const sets = data.data
        .filter(
          (set: any) =>
            set.set_type === "masters" ||
            set.set_type === "commander" ||
            set.set_type === "core" ||
            set.set_type === "funny" ||
            set.set_type === "expansion" ||
            set.set_type === "draft_innovation"
        )
        .sort((a: any, b: any) => {
          const dateA = new Date(a.released_at);
          const dateB = new Date(b.released_at);
          return dateA.getTime() - dateB.getTime();
        })
        .map((set: any) => {
          return {
            id: set.id,
            name: set.name,
            code: set.code,
            released_at: set.released_at,
            icon_svg_uri: set.icon_svg_uri,
            set_type: set.set_type,
          };
        });
      setSets(sets);
    });
  }, []);

  const moveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown || !listRef.current) return;
    listRef.current.scrollLeft -= e.movementX;
  }

  return (
    <List
      ref={listRef}
      onWheelCapture={(e) => (listRef.current!.scrollLeft += e.deltaY)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseMoveCapture={moveHandler}
      $dragging={mouseDown}
    >
      {sets.map((set) => {
        return (
          <SetImage
            key={set.id}
            src={set.icon_svg_uri}
            alt={`${set.name} icon`}
            title={set.name}
            height="50"
            onDragStart={(e) => e.preventDefault()}
          />
        );
      })}
    </List>
  );
};

const List = styled.div<{ $dragging: boolean }>`
  overflow-x: auto;
  display: flex;
  gap: 10px;
  padding: 20px;
  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
  &::-webkit-scrollbar {
    display: none;
  }
`

const SetImage = styled.img`
  user-select: none;
  height: 50px;
  width: 50px;
  filter: invert(1);
`

export default SetList;
