const capitalizeFirst = (word) => {
    const firstLetter = word.charAt(0).toUpperCase()
        + word.slice(1)
    return firstLetter
}

export default capitalizeFirst