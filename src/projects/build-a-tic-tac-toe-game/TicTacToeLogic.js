import { shuffle, head, isEmpty, pick } from 'lodash'
import {
  compose,
  getContext,
  lifecycle,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose'

const player1 = 'X'
const player2 = 'O'

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const isWin = board => {
  let didWin = false
  win.forEach(([one, two, three]) => {
    if (didWin) {
      return
    }
    const fields = Object.values(pick(board, [one, two, three]))
    const notEmpty = e => !isEmpty(e)
    if (
      fields.every(notEmpty) &&
      !!fields.reduce((a, b) => (a === b ? a : NaN))
    ) {
      didWin = [one, two, three]
    }
  })
  return didWin
}

const switchPlayer = current => (current === player1 ? player2 : player1)

const initialState = {
  board: [...Array(9)].map(() => null),
  message: 'Select your mark',
  win: false,
  currentPlayer: '',
  player: '',
  pc: '',
  gameActive: false,
}

const ConnectedTicTacToe = compose(
  getContext({
    appColor: () => null,
  }),
  withStateHandlers(initialState, {
    reset: () => () => initialState,
    selectMark: () => player => {
      const currentPlayer = Math.random() >= 0.5 ? player1 : player2
      const pc = switchPlayer(player)
      return {
        player,
        pc,
        currentPlayer,
        message: `${currentPlayer === pc ? "PC's" : 'Your'} turn`,
        gameActive: true,
      }
    },
    setMark: ({ board, currentPlayer, pc }) => index => {
      if (isEmpty(currentPlayer)) {
        return
      }
      const newBoard = board.map(
        (tile, i) => (isEmpty(tile) && i === index ? currentPlayer : tile)
      )
      const win = isWin(newBoard)
      const newCurrentPlayer = switchPlayer(currentPlayer)
      return {
        currentPlayer: newCurrentPlayer,
        board: newBoard,
        win,
        message: win
          ? `${currentPlayer === pc ? 'PC has' : 'You have'} won!`
          : `${newCurrentPlayer === pc ? "PC's" : 'Your'} turn`,
        gameActive: !win,
      }
    },
  }),
  withHandlers({
    onPlayerClick: props => index => {
      const { currentPlayer, player, setMark } = props
      console.log('onPlayerClick', props)
      if (player === currentPlayer) {
        setMark(index)
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps({ currentPlayer, pc, board, setMark, win }) {
      if (win) {
        return
      }
      if (!isEmpty(pc) && currentPlayer === pc) {
        const randomTile = head(
          shuffle(
            board
              .reduce(
                (arr, tile, index) => [...arr, isEmpty(tile) && index],
                []
              )
              .filter(t => !!t)
          )
        )
        setTimeout(() => setMark(randomTile), 500)
      }
    },
  }),
  withProps(p => console.log(p))
)

export default ConnectedTicTacToe
