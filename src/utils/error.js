class fetchError extends Error {
    constructor(message, field){
        super(message)
        this.field = field
    }
}

export default fetchError;