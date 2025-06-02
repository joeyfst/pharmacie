export default class Medicament {
    constructor(JSON) {
        this._id = JSON.id
        this._denomination = JSON.denomination
        this._formepharmaceutique = JSON.formepharmaceutique
        this._photo = JSON.photo
        this._qte = JSON.qte
    }
    get id() { return this._id }
    get denomination() { return this._denomination }
    get formepharmaceutique() { return this._formepharmaceutique }
    get photo() { return this._photo }
    get qte() { return this._qte }
}