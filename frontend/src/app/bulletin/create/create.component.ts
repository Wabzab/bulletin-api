import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { BulletinService } from '../bulletin.service';
import { departmentOptions } from 'src/constants/department-constants';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  departmentOptions: string[] = departmentOptions

  issue = new FormControl('',
    [Validators.required]
  )
  departments = new FormControl('',
    [Validators.required]
  )

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    public bulletinService: BulletinService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    const d = this.departments.value ? this.departments.value : '';
    const i = this.issue.value ? this.issue.value : '';
    this.bulletinService.saveBulletin(String(d).split(','), i);
    this.dialogRef.close();
  }

  getIssueError() {
    if (this.issue.hasError('required')) {
      return 'You must enter an issue.'
    }

    return ''
  }

  getDepartmentError() {
    if (this.departments.hasError('required')) {
      return 'You must select at least one department.'
    }

    return ''
  }

}
