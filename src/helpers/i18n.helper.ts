import { I18nService } from 'nestjs-i18n';

let i18nService: I18nService;

/**
 * set i18n service
 * @param service
 */
export function setI18n(service: I18nService) {
  i18nService = service;
}

/**
 * Translate text from i18n data
 * @param key
 * @param args
 */
export function translate(key: string, args?: Record<string, any>) {
  return i18nService.translate(key, {
    lang: process.env.APP_LANG || 'en',
    args,
  });
}
