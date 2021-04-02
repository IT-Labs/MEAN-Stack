import { StateContext } from '@ngxs/store';
import produce, { Draft } from 'immer';

export default function stateProduce<TStateModel>(
  ctx: StateContext<TStateModel>,
  recipe: (draft: Draft<TStateModel>) => void
): void {
  const state = produce(ctx.getState(), recipe);
  ctx.setState(state);
}
