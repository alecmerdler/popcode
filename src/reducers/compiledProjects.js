import {List} from 'immutable';
import {handleActions} from 'redux-actions';

import {CompiledProject} from '../records';
import {projectCompiled, refreshPreview} from '../actions/compiledProjects';
import {userDoneTyping} from '../actions/ui';
import {validatedSource} from '../actions/errors';
import {projectCreated, changeCurrentProject} from '../actions/projects';

const defaultState = new List();

function trimRight(list, maxLength) {
  if (list.size <= maxLength) {
    return list;
  }

  return list.splice(0, list.size - maxLength);
}

export default handleActions(
  {
    [projectCreated]: () => defaultState,
    [changeCurrentProject]: () => defaultState,
    [refreshPreview]: (state, action) => {
      if (state.isEmpty()) {
        return state;
      }
      const {source, title} = state.last();
      return trimRight(
        state.push(
          new CompiledProject({
            source,
            title,
            compiledProjectKey: action.payload.timestamp,
            sourceMap: action.payload.sourceMap,
          }),
        ),
      );
    },
    [projectCompiled]: (state, action) =>
      trimRight(
        state.push(
          new CompiledProject({
            source: action.payload.source,
            title: action.payload.title,
            compiledProjectKey: action.meta.timestamp,
            sourceMap: action.payload.sourceMap,
          }),
        ),
        2,
      ),
    [userDoneTyping]: state => trimRight(state, 1),
    [validatedSource]: (state, action) =>
      action.payload.errors.length ? defaultState : state,
  },
  defaultState,
);

// TODO(alecmerdler): Use `handleActions()`
// export default function compiledProjects(stateIn, action) {
//   let state = stateIn;
//   if (state === undefined) {
//     state = initialState;
//   }

//   switch (action.type) {
//     case 'PROJECT_CREATED':
//       return initialState;

//     case 'CHANGE_CURRENT_PROJECT':
//       return initialState;

//     case 'REFRESH_PREVIEW': {
//       if (state.isEmpty()) {
//         return state;
//       }

//       const {source, title} = state.last();
//       return trimRight(
//         state.push(
//           new CompiledProject({
//             source,
//             title,
//             compiledProjectKey: action.payload.timestamp,
//             sourceMap: action.payload.sourceMap,
//           }),
//         ),
//       );
//     }

//     case 'PROJECT_COMPILED':
//       return trimRight(
//         state.push(
//           new CompiledProject({
//             source: action.payload.source,
//             title: action.payload.title,
//             compiledProjectKey: action.meta.timestamp,
//             sourceMap: action.payload.sourceMap,
//           }),
//         ),
//         2,
//       );

//     case 'USER_DONE_TYPING':
//       return trimRight(state, 1);

//     case 'VALIDATED_SOURCE':
//       if (action.payload.errors.length) {
//         return initialState;
//       }
//       return state;
//   }

//   return state;
// }
