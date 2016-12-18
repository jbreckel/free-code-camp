// mapProps(({ ...props }) => ({
//   ...props,
//   getRandomQuote(cb) {
//     fetch('http://quotes.stormconsultancy.co.uk/random.json')
//     .then((res) => res.json())
//     .then(cb)
//   },
// })),
// withState('quote', 'setQuote', {}),
// mapProps(({ getRandomQuote, setQuote, ...props }) => ({
//   ...props,
//   updateQuote() {
//     getRandomQuote(setQuote)
//   },
// }))
