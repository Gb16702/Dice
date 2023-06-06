export class AuthRequiredError extends Error {
    constructor(message = "Vous devez être connecté pour accéder à cette page") {
        super(message)
        this.name = "AuthRequired"
    }
}

export class adminRequiredError extends Error {
    constructor(message = "Cette page est réservée aux administrateurs") {
    super(message)
    this.name = "AdminRequired"
    }
}

export class NotFoundError extends Error {
    constructor(message = "Cette page n'existe pas") {
        super(message)
        this.name = "NotFound"
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Vous n'êtes pas autorisé à accéder à cette page") {
        super(message)
        this.name = "Forbidden"
    }
}
