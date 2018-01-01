const RelatedPathHandler = require('./RelatedPathHandler');
const ACFFieldsHandler = require('./ACFFieldsHandler');
const HeaderHandler = require('./HeaderHandler');
const FooterHandler = require('./FooterHandler');
const PageHandler = require('./PageHandler');
const FormHandler = require('./FormHandler');
const ContentHandler = require('./ContentHandler');
const AttributeHandler = require('./AttributeHandler');
const CustomPostsHandler = require('./CustomPostsHandler');
const InjectionHandler = require('./InjectionHandler');
const LightboxHandler = require('./LightboxHandler');
const EmbedHandler = require('./EmbedHandler');
const LoopHandler = require('./LoopHandler');
const cheerio = require('cheerio');

class BulkPageHandler {
  constructor(fileName, globalSettings) {
    if(fileName.includes('.html')) {
      const { wfSitePath, fileHandler, acfSettings, functions } = globalSettings;
      this.fileName = fileName;
      this.globalSettings = globalSettings;
      this.fileDataAsString = fileHandler.read(`${wfSitePath}/${fileName}`, '');
      this.$ = cheerio.load(this.fileDataAsString);
      this.isFronPage = fileName === 'index.html'
    } else {
      this.notHtml = true;
    }
  }

  handle() {
    const { notHtml, globalSettings } = this;
    if(notHtml) return false;

    new EmbedHandler(this, globalSettings).handle();
    new RelatedPathHandler(this).handle();
    new LoopHandler(this).handle();
    new ACFFieldsHandler(this, globalSettings).handle();
    new LightboxHandler(this).handle();
    new ContentHandler(this).handle();
    new AttributeHandler(this).handle();
    new InjectionHandler(this).handle();
    this.callIndexHandlers();
    new CustomPostsHandler(this, globalSettings).handle();
    new FormHandler(this).handle();
    new PageHandler(this, globalSettings).handle();
  }

  callIndexHandlers() {
    const { isFronPage, globalSettings } = this;
    if(!isFronPage) return;
    new HeaderHandler(this, globalSettings).handle();
    new FooterHandler(this, globalSettings).handle();
  }
}

module.exports = BulkPageHandler;
