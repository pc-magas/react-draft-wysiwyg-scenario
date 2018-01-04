import Utils from './Utils';

const Link= (props) => {
    console.log(props);
    return (
      <a href="http://google.com">GOOGLE</a>  
    );
}

const matchFunction = (contentBlock, callback, contentState) => {
    /**
     * Regex found in: https://stackoverflow.com/a/17773849/4706711
     */
    const regex=/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
    Utils.regexMatch(regex,contentBlock,contentState);
}

export default {
    'strategy': matchFunction,
    'component': Link
};