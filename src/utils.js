export class Feature {
    constructor(name, pageTypes, service = [], isActive=true) {
        this.name = name;
        this.pageTypes = pageTypes;
        this.service = service
        this.isActive = isActive;
    }
}