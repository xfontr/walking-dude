import { useEffect, useState } from "react";
import useDirections from "../../hooks/useDirections";
import CellTypes from "../../types/CellTypes";
import Position from "../../types/Position";
import Cell from "../Cell/Cell";
import FieldStyled from "./Field.styled";

type FieldProps = {
  initialBoard: Map<Position, CellTypes>;
};

const Field = ({ initialBoard }: FieldProps): JSX.Element => {
  const [player, setPlayer] = useState<Position>("1-1");
  const [currentBoard, setCurrentBoard] =
    useState<typeof initialBoard>(initialBoard);

  useDirections(setCurrentBoard, setPlayer, player);
  const renderBoard: JSX.Element[] = [];

  currentBoard.forEach((type, position) => {
    renderBoard.push(
      <Cell cellType={type} position={position} key={position} />
    );
  });

  return <FieldStyled>{renderBoard}</FieldStyled>;
};

export default Field;
