import Field from "../Field/Field";
import { readBoard } from "../../utils/readBoard/readBoard";
import EditTools from "../EditTools/EditTools";
import { FieldProps } from "../../containers/FieldContainer/FieldContainer";
import fieldEditorUtils from "../../utils/fieldEditorUtils/fieldEditorUtils";
import { SyntheticEvent, useEffect } from "react";
import boards from "../../data/boards";
import { UserBoard } from "../../types/UserBoard";
import Button, { IconButton } from "../Button/Button";
import FieldEditorStyled from "./FieldEditor.styled";
import Form from "../Form/Form";
import editFieldForm from "../../schemas/editField.form";
import useForm from "../../hooks/useForm/useForm";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import usePlaying from "../../hooks/usePlaying/usePlaying";

const FieldEditor = (props: FieldProps): JSX.Element => {
  const {
    switchEditTool,
    resetBoard,
    disableTools,
    increaseSize,
    decreaseSize,
  } = fieldEditorUtils(props);

  const {
    cells,
    board,
    setCells,
    gameStatus: {
      editMode: { editTool },
      game: { fieldSize },
    },
  } = props;
  const { values, inputProps } = useForm(editFieldForm);
  const { startGame } = usePlaying();

  useEffect(() => {
    disableTools();
  }, [cells, disableTools]);

  const handleSubmit = ({ currentTarget: { id } }: SyntheticEvent) => {
    const newBoard: UserBoard = {
      shoots: +values.shoots,
      timeLeft: +values.timeLeft,
      exits: cells.exit,
      board,
    };

    boards.push(newBoard);

    if (id === "play") {
      startGame();
    }
  };

  return (
    <FieldEditorStyled>
      <Form inputProps={inputProps} schema={editFieldForm} values={values} />

      <EditTools
        cells={cells}
        editTool={editTool}
        switchEditTool={switchEditTool}
      />

      <div className="edit__options">
        <Button onClick={resetBoard}>Reset board</Button>
        <div className="options__container">
          <span className="options__heading">Field size</span>
          <div className="options__field-size">
            <span className="options__heading">Size: {fieldSize}</span>
            <IconButton
              onClick={decreaseSize}
              aria-label="increase"
              data-testid="increase"
            >
              <HiOutlineMinus />
            </IconButton>
            <IconButton
              onClick={increaseSize}
              aria-label="decrease"
              data-testid="decrease"
            >
              <HiOutlinePlus />
            </IconButton>
          </div>
        </div>
      </div>

      <Field
        data-testid="field"
        onClick={() => {
          setCells(readBoard(board));
        }}
        initialBoard={board}
        isEditMode={true}
        fieldSize={fieldSize}
      />

      <Button onClick={handleSubmit} type="submit">
        Submit
      </Button>
      <Button onClick={handleSubmit} type="submit" id="play">
        Submit and play
      </Button>
    </FieldEditorStyled>
  );
};

export default FieldEditor;
