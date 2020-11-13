

export class Client {
    constructor(
        id: string,
        descripcion: string
    ) {}

    set id(newId: string) {
        this.id = newId
    }

    set descripcion(newDescripcion: string) {
        this.descripcion = newDescripcion
    }

    get id(): string {
        return this.id
    }

    get descripcion(): string {
        return this.descripcion
    }
}