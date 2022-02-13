import { InputComponent } from '../components/input/input.component';
import { TextAreaComponent } from '../components/text-area/text-area.component';

export interface ConfigRequestData {
  id: number,
  type: string,
  details: {
    label: string,
    required: boolean,
    visible: boolean,
    rows?: number,
  }
}

export interface DialogDataConfirmation {
  message: string;
}

export interface DialogDataAddEditField {
  data: ConfigRequestData;
  type: string;
}

export interface Types {
  id: number,
  name: string,
}

export interface FormFieldTypes {
  input: typeof InputComponent,
  textArea: typeof TextAreaComponent,
}
