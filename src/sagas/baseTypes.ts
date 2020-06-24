import { Action } from 'redux';

export interface IAction<T, P = any> extends Action<T> {
    payload?: P;
}