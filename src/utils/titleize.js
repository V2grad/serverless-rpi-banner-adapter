String.prototype.titleize = function () {
    return this.toLowerCase().replace(/(?:^|\s|-)\S/g, function (m) {
        return m.toUpperCase();
    });
}