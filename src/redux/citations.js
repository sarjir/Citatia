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
      reactors: [
        {id: '1'},
        {id: '2'},
        {id: '5'}
      ]
    },
    {
      action: '\u{2764}',
      reactors: [
        {id: '3'},
        {id: '5'},
        {id: '52'},
        {id: '123'}
      ]
    },
    {
      action: '\u{1F602}',
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
  switch (action.type) {
    case ADD_REACTION_COUNT:
      return {
        ...state[action.actionId],
        reactors: [
          ...state[action.actionId].reactors,
          { id: action.reactorId }
        ]
      }
  }
  return state;
}

export function addReactionCount(actionId, reactorId) {
  return {
    type: ADD_REACTION_COUNT,
    actionId,
    reactorId
  }
}
