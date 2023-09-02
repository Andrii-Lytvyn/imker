const shuffleQuestion = (array: string[]) => {
    return array.reduce((_shuffledArray, _, currentIndex, originalArray) => {
        const randomIndex = Math.floor(Math.random() * (originalArray.length - currentIndex));
        [originalArray[currentIndex], originalArray[randomIndex]] = [originalArray[randomIndex], originalArray[currentIndex]];
        return originalArray;
    }, [...array]);
}

export { shuffleQuestion }