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
  styleUrls: ['./file.component.scss'],
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

  get fileList(): File[] {
    const files = this.control?.value ?? this.value;
    return files ? Array.from(files) : [];
  }

  get fileNames(): string {
    return this.fileList.map(file => file.name).join(', ');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files?.length ? input.files : null;
    this.value = files;
    if (this.control) {
      this.control.setValue(files);
    }
    this.valueChange.emit(files);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}