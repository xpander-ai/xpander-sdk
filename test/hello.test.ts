import { Plugin, XpanderClient } from '../src';

test('client', () => {
  expect(new XpanderClient('45C5SMkWBy879rS8kYXyea1gAoazuDTIaHn2gtYq', 'https://inbound.xpander.ai/agent/e4ae74cf-e31c-450b-97f2-51f1734d0377').tools(Plugin.OPEN_AI));
});