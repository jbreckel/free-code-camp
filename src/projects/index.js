import TributePage from './tribute-page'
import MarkdownPreviewer from './markdown-previewer'
import CamperLeaderboard from './camper-leaderboard'
import RandomQuoteMachine from './random-quote-machine'

export default [
  {
    name: 'Tribute Page',
    Component: TributePage,
    pattern: '/tribute-page',
  },
  {
    name: 'Markdown Previewer',
    Component: MarkdownPreviewer,
    pattern: '/markdown-previewer',
  },
  {
    name: 'Camper Leaderboard',
    Component: CamperLeaderboard,
    pattern: '/camper-leaderboard',
  },
  {
    name: 'Random Quote Machine',
    Component: RandomQuoteMachine,
    pattern: '/random-quote-machine',
  },
]
