const convertTime = (time) => {
  return new Date(time).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short',
  })
}

export default convertTime;