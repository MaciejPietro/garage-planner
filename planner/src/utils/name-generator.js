export default class NameGenerator {
    static generateName(prototype, type) {
        console.log(prototype, type);
        return type.substr(0, 1).toUpperCase() + type.substr(1);
    }
}
