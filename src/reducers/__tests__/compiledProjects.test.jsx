import reduce from 'lodash-es/reduce';
import forEach from 'lodash-es/forEach';
import {List} from 'immutable';

import reducer from '../compiledProjects';
import {projectCompiled, refreshPreview} from '../../actions/compiledProjects';
import {projectCreated, changeCurrentProject} from '../../actions/projects';

// TODO(alecmerdler): Is this way better?
describe('compiledProjects reducer', () => {
  const actionCreators = {
    projectCompiled,
    refreshPreview,
    projectCreated,
    changeCurrentProject,
  };
  const payloads = {};
  const initialState = new List();

  forEach(actionCreators, (actionCreator, actionName) => {
    it(actionName, () => {
      const action = actionCreator(payloads[actionName]);

      expect(reducer(initialState, action)).toEqual(null);
    });
  });
});

// test('projectCreated returns initial state', () => {
//   expect(applyActions(projectCreated())).toEqual(new List());
// });

// test('changeCurrentProject returns initial state', () => {
//   expect(applyActions(changeCurrentProject())).toEqual(new List());
// });

// test('refreshPreview returns given state if it is empty', () => {
//   expect(applyActions(refreshPreview()).isEmpty()).toBe(true);
// });

// test('refreshPreview returns list with new CompiledProject in place of old one if previously compiled', () => {
//   const state = applyActions(projectCompiled(), refreshPreview());

//   expect(state.isEmpty()).toBe(false);
// });

// function applyActions(...actions) {
//   return reduce(actions, (state, action) => reducer(state, action), undefined);
// }
