const ADD_REACTION_COUNT = 'ADD_REACTION_COUNT';
const SUBTRACT_REACTION_COUNT = 'SUBTRACT_REACTION_COUNT';

const initialState = [{
  id: '1',
  citation: 'Jag suger, men du sväljer',
  author: 'Sara Jirholm',
  date: '2016-09-12',
  image: 'images/background.jpg',
  actions: [
    {
      action: '\u{1F44D}',
      count: 3,
      reactors: [
        {id: '1'},
        {id: '2'},
        {id: '5'}
      ]
    },
    {
      action: '\u{2764}',
      count: 34,
      reactors: [
        {id: '3'},
        {id: '5'},
        {id: '52'},
        {id: '123'}
      ]
    },
    {
      action: '\u{1F602}',
      count: 234,
      reactors: [
        {id: '3'},
        {id: '6'},
        {id: '52'},
        {id: '123'},
        {id: '542'},
        {id: '98'}
      ]
    },
  ],
}];

export function reducer(state = initialState, action){
  return state;
}
