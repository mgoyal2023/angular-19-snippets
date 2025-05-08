import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'dt-file',
  imports: [MatFormFieldModule, CommonModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {
  @Input() cssStyle: { [klass: string]: any } = {};
  @Input() control?: FormControl;
  @Input() label = 'Upload File';
  @Input() multiple = false;
  @Input() accept = '';
  @Input() disabled = false;
  @Input() showFileNames = false;
  @Input() value?: FileList | null = null;
  @Output() valueChange = new EventEmitter<FileList | null>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files?.length ? input.files : null;
    this.value = files;
    if (this.control) {
      this.control.setValue(files);
    }
    this.valueChange.emit(files);
  }

  get fileNames(): string {
    const files: FileList | null = this.control?.value ?? this.value;
    return files
      ? Array.from(files)
          .map((file) => file.name)
          .join(', ')
      : '';
  }
}