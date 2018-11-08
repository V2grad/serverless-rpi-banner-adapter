const xml = require('fast-xml-parser')

const options = {
    attributeNamePrefix: "",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    // attrValueProcessor: a => a //default is a=>a
    // tagValueProcessor: a => he.decode(a) //default is a=>a
};

module.exports = {
    parseXML(xmlData) {
        return xml.parse(xmlData, options)
    }
}