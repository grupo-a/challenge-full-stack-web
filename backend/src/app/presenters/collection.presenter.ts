import { Exclude, Expose } from 'class-transformer';
import {
  PaginationPresenter,
  PaginationPresenterProps,
} from './pagination.presenter';

export abstract class CollectionPresenter {
  @Exclude()
  protected meta: PaginationPresenter;

  constructor(props: PaginationPresenterProps) {
    this.meta = new PaginationPresenter(props);
  }

  abstract get data ();
}
