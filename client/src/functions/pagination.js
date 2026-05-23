let current = 1

export const pagination = operation => {
    operation == '+' ? current++ : current--
    return current
}