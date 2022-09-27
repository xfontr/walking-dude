import { IGameContext } from "../../Store/CallStatusContext/GameContext";

export const mockSetGameStatus = jest.fn() as React.Dispatch<
  React.SetStateAction<IGameContext>
>;

const mockContextProvider: IGameContext = {
  isEditMode: true,
  editTool: "obstacle",
  isPlaying: false,
  game: {
    timeLeft: 3000,
    score: 0,
    shootsLeft: 3,
  },
  setGameStatus: mockSetGameStatus,
};

export default mockContextProvider;
