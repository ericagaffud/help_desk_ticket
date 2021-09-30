const myIssue = async(issue) => {
    const res = await fetch('http://localhost:5000/issues', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(issue),
    })
    const data = await res.json()
    return data
}

const fetchIssues = async () => {
    const res = await fetch ('http://localhost:5000/issues')
    const data = await res.json()
    return data
}

const fetchIssue = async (id) => {
    const res = await fetch (`http://localhost:5000/issues/${id}`)
    const data = await res.json()
    return data
}

export {
  myIssue,
  fetchIssues,
  fetchIssue
}