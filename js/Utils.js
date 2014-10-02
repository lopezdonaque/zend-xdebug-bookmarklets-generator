
var Utils =
{
  version: "0.5.2",

  defaultExpiresDate: "Mon, 05 Jul 2000 00:00:00 GMT",
  defaultPath: "/",


  /**
   * Surround code
   *
   * @param {String} code
   * @return {String}
   */
  surroundCode: function( code )
  {
    return 'javascript:(' + this.getVersionComment( this.version ) + 'function() {' + code + '})()';
  },


  getVersionComment: function( version )
  {
    return '/** @version ' + version + ' */';
  },

  getCookieAssignment: function( name, value, path, expiresDate )
  {
    return "document.cookie='" +
           name + "='+" + value + "+';" +
           (expiresDate !== undefined ? ("expires=" + expiresDate + ";") : "") +
           "path=" + path + ";" +
           "';";
  },

  getCookieAssignments: function( cookies, path, expiresDate )
  {
    var result = "";
    for( var cookieName in cookies )
    {
      var cookieValue = cookies[cookieName];
      result += this.getCookieAssignment( cookieName, cookieValue, path, expiresDate );
    }
    return result;
  },

  getDestroyCookiesCode: function( cookiesNames )
  {
    var cookies = {};
    for( var key in cookiesNames )
    {
      var cookieName = cookiesNames[key];
      cookies[cookieName] = this.getStringLiteralExpression("");
    }
    return this.getCookieAssignments( cookies, this.defaultPath, this.defaultExpiresDate );
  },

  getStringLiteralExpression: function( literal )
  {
    return "'" + literal + "'";
  },

  getReloadPageCode: function()
  {
    return "document.location.reload();";
  }

};
