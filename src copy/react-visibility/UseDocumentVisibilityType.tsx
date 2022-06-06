function getBrowserVisibilityProp() {
    if (typeof document.hidden !== 'undefined') {
      return 'visibilitychange';
    }
    // else if (typeof document.msHidden !== "undefined") {
    //   return "msvisibilitychange"
    // } else if (typeof document.webkitHidden !== "undefined") {
    //   return "webkitvisibilitychange"
    // }
    return 'visibilitychange';
  }

function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== 'undefined') {
      return 'hidden';
    }
    // else if (typeof document.msHidden !== "undefined") {
    //   return "msHidden"
    // } else if (typeof document.webkitHidden !== "undefined") {
    //   return "webkitHidden"
    // }
    return 'hidden';
  }

 function getIsDocumentHidden() {
    return !document.hidden;
  }

export default { getBrowserDocumentHiddenProp ,getIsDocumentHidden,getBrowserVisibilityProp};
