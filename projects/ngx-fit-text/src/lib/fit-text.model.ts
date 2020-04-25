export interface STYLE {
  propery: string;
  value: string;
}
export interface FITTEXT {
  mainDiv: any;
  fitDiv: any;
  maxSize: string;
  minSize: string;
  divHeight: string;
  logs: boolean;
  middle?: boolean;
}
export interface AdvancedFitTextOptions {
  delay?: number;
  fitOnWindowResize?: boolean;
}
