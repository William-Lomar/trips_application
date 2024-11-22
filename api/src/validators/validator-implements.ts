export abstract class Validator<T> {
    abstract validate(object: object): T
}