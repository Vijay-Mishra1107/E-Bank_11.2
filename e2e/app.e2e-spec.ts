import { NgWiproBankPage } from './app.po';

describe('ng-WiproBank App', () => {
  let page: NgWiproBankPage;

  beforeEach(() => {
    page = new NgWiproBankPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
