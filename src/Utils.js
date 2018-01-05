/**
 * A generic utility Library
 */

export default {
    /**
     * A utility function that is used on Composite Decorators for handling
     * regex - based text maniluplation.
     * @param {Regex} regex The regular expression to handle
     * @param {Object} contentBlock The content block that needs to get manipulated
     * @param {Function} callback A callback function that gets called when the regex matches
     */
    'regexMatch': (regex, contentBlock, callback)=>{
        const text = contentBlock.getText();
        let matchArr = regex.exec(text);
        let start;
        console.log("Block Content", text);
        while (matchArr !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
          matchArr = regex.exec(text);
        }
    },
}