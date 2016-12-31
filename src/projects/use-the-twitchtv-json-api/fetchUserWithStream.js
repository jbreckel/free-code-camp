const fetchUserWithStream = (login) =>
  fetch(`https://api.twitch.tv/kraken/users?api_version=5&login=${login}`, {
    headers: {
      'Client-ID': 'me2awd9bz1xcgqtyu399klqdpahpee',
    },
  })
  .then((res) => res.json())
  .then(({ users }) => users[0])
  .then(({ _id, ...user }) =>
    fetch(`https://api.twitch.tv/kraken/streams/${_id}?api_version=5`, {
      headers: {
        'Client-ID': 'me2awd9bz1xcgqtyu399klqdpahpee',
      },
    })
    .then((res) => res.json())
    .then((stream) => ({
      user: {
        id: _id,
        ...user,
      },
      stream,
    }))
  )

export default fetchUserWithStream
