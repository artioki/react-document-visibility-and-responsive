function getBrowserVisibilityProp() {
    if (typeof document.hidden !== 'undefined') {
      return 'visibilitychange';
    }
    return 'visibilitychange';
}

function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== 'undefined') {
      return 'hidden';
    }
    return 'hidden';
}

function getIsDocumentHidden() {
    return !document.hidden;
}

export default { getBrowserDocumentHiddenProp ,getIsDocumentHidden,getBrowserVisibilityProp};