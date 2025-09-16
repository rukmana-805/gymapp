
const asyncHandler = (requistHandler) => {
    return (req, resp, next) => {
        Promise.resolve(requistHandler(req, resp, next))
        .catch((error) => next(error))
    }
}

export { asyncHandler }