exports.logger = (err) => {
    if (err) {
        // @TODO: Log errors
        console.error(err.message)
    }
}

exports.renderWithAuth = (req, res, route, params = {}) => {
    const authCreds = req.session?.auth || {}
    res.render(route, {
        ...params,
        ...authCreds
    })
}

exports.redirectWithAuth = (req, res, route, params = {}) => {
    const authCreds = req.session?.auth || {}
    res.render(route, {
        ...params,
        ...authCreds
    })
}

exports.getSession = (req) => {
    return {
        isLoggedIn: req.session?.auth?.isLoggedIn || false,
        username: req.session?.auth?.username || null,
        userId: req.session?.auth?.userId || null
    }
}