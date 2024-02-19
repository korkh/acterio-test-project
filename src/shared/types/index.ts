export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface RejectWithValue<TPayload, TError> {
  payload: TPayload;
  error: TError;
}
