/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly __API__: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
