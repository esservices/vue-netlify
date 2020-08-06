export function getLanguages() {
  return process.env.VUE_APP_LANGUAGES.split(' ');
}

export function removeCurrentLanguage(string, currentLanguage) {
  return string.replace(new RegExp('/' + currentLanguage + '($|/)'), '/');
}

export function removeLanguage(string) {
  const languages = getLanguages();

  let langsExpr = '';

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];
    
    if (i!=0) {
      langsExpr += '|'
    }

    langsExpr += '/' + language + '($|/)';
    
  }

  return string.replace(new RegExp(langsExpr), '/');
}

export function getCurrentLanguage() {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp('/' + language + '($|/)').test(window.location.pathname)) {
      return language;
    }
  }

  return languages[0];
}

export function getRouterBasename() {
  const nodeName = process.env.VUE_APP_SITE_BASENAME;
  const languages = getLanguages();
  var pathname = window.location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + '.*'), '') + nodeName;
  }

  const currentLanguage = getCurrentLanguage();

  return languages[0] === currentLanguage ? '/' : '/' + currentLanguage;
}
