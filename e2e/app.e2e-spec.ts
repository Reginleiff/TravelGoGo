import { AppTravelgogoPage } from './app.po';

describe('app-travelgogo App', () => {
  let page: AppTravelgogoPage;

  beforeEach(() => {
    page = new AppTravelgogoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
