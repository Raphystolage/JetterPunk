export class Feature {
    constructor(name, pageTypes = [], services = [], isActive=true) {
        this.name = name;
        this.pageTypes = pageTypes;
        this.services = services
        this.isActive = isActive;
    }
}