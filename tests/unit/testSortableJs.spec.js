import Sortable from "sortablejs";

jest.mock('sortablejs');

describe('test sortablejs', () => {
  test('sortablejs is mocked', () => {
    console.log('Sortable', Sortable);
    expect(Sortable._isMockFunction).toBeTruthy();

    const sortable = new Sortable(1, 2);
    expect(Sortable.mock.calls[0][1]).toBe(2);
  });
});

